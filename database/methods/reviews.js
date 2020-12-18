const { Client } = require('pg');
const client = new Client({database: 'product_reviews'});

const pgConnect = () => client.connect();

const addReview = (review, cb) => {
  // client.connect();
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
  // client.connect();
  client.query(`SELECT * FROM reviews WHERE product_id = ${product.product_id}`, (err, res) => {
    if (err) {
      console.log('PROBLEM GETTING THE REQUESTED REVIEWS: ', err);
      cb(err);
    } else {
      cb(null, res.rows);
    }
  })
};

const updateReview = (column, info, id, cb) => {
  // client.connect();
  client.query(`UPDATE reviews SET ${column} = '${info}' WHERE id = ${id} RETURNING *`, (err, res) => {
    if (err) {
      console.log('PROBLEM UPDATING THIS REVIEW: ', err);
      cb(err);
    } else {
      cb(null, `${column} updated to ${info}`);
    }
  })
};

const deleteReview = (id, cb) => {
  // client.connect();
  client.query(`DELETE FROM reviews WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('COULD NOT DELETE REVIEW: ', err);
      cb(err);
    } else {
      cb(null, `Review ${id} deleted from database.`);
    }
  })
};

module.exports = {
  pgConnect,
  addReview,
  getReviews,
  updateReview,
  deleteReview
};
