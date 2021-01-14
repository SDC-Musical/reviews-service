const pass = require('../dbpass.js');
const { Pool, Client } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: pass.pass,
  host: '3.19.63.99',
  database: 'postgres'
});

const getReviewSummary = (product, cb) => {
  pool.connect();
  let summary = [{
    rating_1: 0,
    rating_2: 0,
    rating_3: 0,
    rating_4: 0,
    rating_5: 0,
    total_reviews: 0
  }];
  pool.query(`SELECT * FROM reviews WHERE product_id = ${product}`, (err, res) => {
    if (err) {
      console.log('PROBLEM GETTING THE REQUESTED REVIEWS: ', err);
    } else {
      summary[0].total_reviews = res.rows.length;
      summary[0].rating_1 = res.rows.filter(review => review.review_rating === 1).length;
      summary[0].rating_2 = res.rows.filter(review => review.review_rating === 2).length;
      summary[0].rating_3 = res.rows.filter(review => review.review_rating === 3).length;
      summary[0].rating_4 = res.rows.filter(review => review.review_rating === 4).length;
      summary[0].rating_5 = res.rows.filter(review => review.review_rating === 5).length;
      console.log('RETURNED SUMMARY: ', summary);
      cb(null, summary);
    }
  })
};

module.exports = {
  getReviewSummary,
};
