const express = require('express');
const { getReviews } = require('../../database/methods/reviews.js');
const ReviewModel = require('../../database/models/reviews.js');
const { getReviewSummary } = require('../../database/methods/reviewsummary.js');
const { queryReviewRating } = require('../middleware/queryParams.js');

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
      const reviewSummary = await getReviewSummary(req.options.product_id);
      console.log('SUMMARY: ', reviewSummary);
      if (reviewSummary.length > 0) res.json(reviewSummary);
      else res.status(404).send('Review Summary Not Found.');
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
      const reviews = await getReviews(req.options, req.query.limit, (err, data) => {
        console.log(data);
      if (data.length > 0) res.json(data);
      else res.status(404).send('Reviews Not Found.');
      });
      // console.log(reviews);
      // if (reviews.length > 0) res.json(reviews);
      // else res.status(404).send('Reviews Not Found.');
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  })
  .put(async (req, res) => {
    try {
      const updateProduct = await ReviewModel.update({product_id: req.options.product_id}, req.data);
      if (updateProduct < 1) {
        res.status(404).send('Product Not Found');
      } else {
        res.status(200).send(`${updateProduct.n} product(s) updated.`);
      }
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  })
  .post(async (req, res) => {
    try {
      let timestamp = new Date();
      const newReview = await ReviewModel.create({
        review_id: req.options.product_id,
        product_id: req.options.product_id,
        username: req.body.username,
        review_heading: req.body.review_heading,
        review_text: req.body.review_text,
        review_rating: req.body.review_rating,
        created_at: `${timestamp.getMonth() + 1} ${timestamp.getDate() + 1}, ${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`
      });
      res.json(newReview);
    } catch(err) {
      console.log('ERROR: ', err);
      res.status(500).send('Internal Server Error.');
    }
  })
  .delete(async (req, res) => {
    try {
      await ReviewModel.deleteMany({product_id: req.options.product_id});
      res.status(200).send('Product Deleted');
    } catch {
      res.status(500).send('Internal Server Error.');
    }
  });

module.exports = router;
