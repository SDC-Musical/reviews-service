const { Client } = require('pg');
const client = new Client({database: 'product_reviews'});

const addReview = (review, cb) => {
  client.connect();
  client.query('INSERT INTO reviews(product_id, username, review_heading, review_text, review_rating, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [review.product_id, review.username, review.review_heading, review.review_text, review.review_rating, review.created_at], (err, res) => {
    if (err) {
      console.log('PROBLEM INSERTING REVIEW: ', err);
      cb(err);
    } else {
      console.log('REVIEW ADDED');
      cb(null, review);
    }
  })
};

const getReviews = (product, limit = 0, cb) => {
  client.connect();
  client.query(`SELECT * FROM reviews WHERE product_id = ${product.product_id}`, (err, res) => {
    if (err) {
      console.log('PROBLEM GETTING THE REQUESTED REVIEWS: ', err);
      cb(err);
    } else {
      console.log(res.rows);
      cb(null, res.rows);
    }
  })
};

const updateReview = (column, info, id, cb) => {
  client.connect();
  client.query(`UPDATE reviews SET ${column} = ${info} WHERE id = ${id} RETURNING *`, (err, res) => {
    if (err) {
      console.log('PROBLEM UPDATING THIS REVIEW: ', err);
      cb(err);
    } else {
      cb(null, `${column} updated to ${info}`);
    }
  })
};

const deleteReview = (id, cb) => {
  client.connect();
  client.query(`DELETE FROM reviews WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('COULD NOT DELETE REVIEW: ', err);
      cb(err);
    } else {
      cb(null, `Review ${id} deleted from database.`);
    }
  })
};

// const ReviewModel = require('../models/reviews.js');
// const counterMethods = require('./counter.js');

// const addReview = (review) => new Promise((resolve, reject) => {
//   counterMethods.incrementReviewSeq()
//     .then((counter) => {
//       // eslint-disable-next-line no-param-reassign
//       review.review_id = (counter) ? counter.seq + 1 : 1;
//       resolve(ReviewModel.create(review));
//     })
//     .catch((err) => reject(err));
// });

// const getReviews = (options, limit = 0) => ReviewModel.find(options, '-_id -__v').limit(limit);

module.exports = {
  addReview,
  getReviews,
  updateReview,
  deleteReview
};
