const { Client } = require('pg');
const client = new Client({database: 'product_reviews'});

const getReviewSummary = product => {
  client.query(`SELECT * FROM reviews WHERE product_id = ${product}`, (err, res) => {
    if (err) {
      console.log('PROBLEM GETTING THE REQUESTED REVIEWS: ', err);
    } else {
      return res;
    }
  })
};

// const ReviewSummary = require('../models/reviewsummary.js');

// const getReviewSummary = (product_id) => ReviewSummary.find({ product_id }, '-_id -__v');

module.exports = {
  getReviewSummary,
};
