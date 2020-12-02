const { Client } = require('pg');
const client = new Client({database: 'product_reviews'});

const getReviewSummary = (product, cb) => {
  client.connect();
  let summary = [{
    rating_1: 0,
    rating_2: 0,
    rating_3: 0,
    rating_4: 0,
    rating_5: 0,
    total_reviews: 0
  }];
  client.query(`SELECT * FROM reviews WHERE product_id = ${product}`, (err, res) => {
    if (err) {
      console.log('PROBLEM GETTING THE REQUESTED REVIEWS: ', err);
    } else {
      summary[0].total_reviews = res.rows.length;
      for (let i = 0; i < res.rows; i++) {
        let rating = res.rows[i].review_rating;
        summary[0][`rating_${rating}`] += 1;
      }
      cb(null, summary);
    }
  })
};

// const ReviewSummary = require('../models/reviewsummary.js');

// const getReviewSummary = (product_id) => ReviewSummary.find({ product_id }, '-_id -__v');

module.exports = {
  getReviewSummary,
};
