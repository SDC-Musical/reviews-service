const express = require('express');
const { pgConnect, getReviews, addReview, updateReview, deleteReview } = require('../../database/methods/reviews.js');
const ReviewModel = require('../../database/models/reviews.js');
const { getReviewSummary } = require('../../database/methods/reviewsummary.js');
const { queryReviewRating } = require('../middleware/queryParams.js');
const redis = require('redis');
const client = redis.createClient();

client.on('error', err => {
  console.error(err);
});

pgConnect();

const router = express.Router();

router.param('product_id', (req, res, next, product_id) => {
  if (Number.isNaN(Number(product_id))) {
    res.status(400).send('Bad Request.');
    return;
  }
  req.options = { product_id: Number(product_id) };
  next();
});

router.route('/:product_id/summary')
  .get(async (req, res) => {
    try {
      const reviewSummary = await getReviewSummary(req.options.product_id, (err, data) => {
      if (data.length > 0) res.json(data);
      else res.status(404).send('Review Summary Not Found.');
      });
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  });

router.route('/:product_id')
  .get(queryReviewRating, async (req, res) => {
    if (req.query.limit !== undefined) {
      if (Number.isNaN(Number(req.query.limit)) || req.query.limit === '' || Number(req.query.limit) < 0) {
        res.status(400).send('Bad Request.');
        return;
      }
    } else req.query.limit = 0;
    try {
      const cache = await client.get(req.options.product_id, (err, reply) => {
        if (err) {
          console.log('PROBLEM WITH CACHE: ', err);
          res.status(500).send('Cache Error.');
        } else if (reply) {
          console.log('REDIS REPLY');
          client.expire(`${req.options.product_id}`, 10);
          res.json(reply);
        } else {
          getReviews(req.options, req.query.limit, async (err, data) => {
            if (data.length > 0) {
              const setCache = await client.set(`${req.options.product_id}`, `${data}`, (err, reply) => {
                if (err) {
                  console.log('PROBLEM SETTING CACHE: ', err);
                  res.status(500).send('Cache Error.');
                } else {
                  client.expire(`${req.options.product_id}`, 10, (err, reply) => {
                    if (err) {
                      console.log('PROBLEM SETTING EXPIRY: ', err);
                      res.status(500).send('Cache Error');
                    } else {
                      res.json(data);
                    }
                  });
                }
              });
            } else {
              res.status(404).send('Reviews Not Found.');
            }
          });
        }
      })
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  })
  .put(async (req, res) => {
    try {
      const updateProduct = await updateReview(req.body.column, req.body.info, req.options.product_id, (err, string) => {
        if (err) {
          res.status(404).send(`Review ${req.options.product_id} not found.`);
        } else {
          res.status(200).send(string);
        }
      });
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  })
  .post(async (req, res) => {
    try {
      let timestamp = new Date();
      const newReview = await addReview({
        product_id: req.options.product_id,
        username: req.body.username,
        review_heading: req.body.review_heading,
        review_text: req.body.review_text,
        review_rating: req.body.review_rating,
        created_at: `${timestamp.getMonth() + 1} ${timestamp.getDate() + 1}, ${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`
      }, (err, data) => {
        if (err) {
          console.log('PROBLEM ADDING REVIEW: ', err);
          res.status(500).send('Internal Server Error.');
        } else {
          res.json(data);
        }
      });
    } catch(err) {
      console.log('ERROR: ', err);
      res.status(500).send('Internal Server Error.');
    }
  })
  .delete(async (req, res) => {
    try {
      await deleteReview(req.options.product_id, (err, string) => {
        if (err) {
          res.status(404).send('Review not found.')
        } else {
          res.status(200).send(string);
        }
      });
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  });

module.exports = router;
