const pass = require('../dbpass.js');
const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  password: pass.pass,
  host: '18.191.213.193',
  database: 'postgres'
});

const pgConnect = () => client.connect();

const addReview = (review, cb) => {
  // client.connect();
  client.query('INSERT INTO reviews(id, product_id, username, review_heading, review_text, review_rating, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [review.id, review.product_id, review.username, review.review_heading, review.review_text, review.review_rating, review.created_at], (err, res) => {
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

const getProduct = (review, cb) => {
  client.query(`SELECT product_id FROM reviews WHERE id = ${review}`, (err, res) => {
    if (err) {
      console.log('COULD NOT FIND THIS REVIEW: ', err);
      cb(err);
    } else {
      cb(null, res.rows[0].product_id);
    }
  })
};

const getLast = (cb) => {
  client.query('SELECT id FROM reviews ORDER BY id DESC LIMIT 1', (err, res) => {
    if (err) {
      console.log('DATABASE NOT FOUND');
      cb(err);
    } else {
      cb(null, res.rows[0].id)
    }
  })
}

module.exports = {
  pgConnect,
  addReview,
  getReviews,
  updateReview,
  deleteReview,
  getProduct,
  getLast
};
