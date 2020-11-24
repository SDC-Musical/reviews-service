const  { LoremIpsum } = require('lorem-ipsum');
const { Client } = require('pg');
const client = new Client();
const Promise = require('bluebird');


client.connect();

let createReviews = function() {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 10,
      min: 4
    }
  });

  let reviews = [];
  for (let i = 0; i < 50; i++) {
    let headingQuantity = Math.ceil(Math.random() * 3)
    let month = Math.ceil(Math.random() * 12);
    let day = Math.ceil(Math.random() * 28);
    let hour = Math.floor(Math.random() * 24);
    let minutes = Math.floor(Math.random() * 60);
    let seconds = Math.floor(Math.random() * 60);
    let review = {
      username: lorem.generateWords(1),
      review_heading: lorem.generateWords(headingQuantity),
      review_text: lorem.generateParagraphs(1),
      review_rating: Math.ceil(Math.random() * 5),
      created_at: new Date(2020, month, day, hour, minutes, seconds).toISOString()
    };
    reviews.push(review);
  }
  return reviews;
};

let entries = function(start, stop) {
  for (let i = start; i <= stop; i++) {
    let quantity = Math.floor(Math.random() * 6);
    for (let j = 0; j < quantity; j++) {
      let index = Math.floor(Math.random() * reviewList.length);
      client.query('INSERT INTO reviews(product_id, username, review_heading, review_text, review_rating, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [i, reviewList[index].username, reviewList[index].review_heading, reviewList[index].review_text, reviewList[index].review_rating, reviewList[index].created_at], (err, res) => {
        if (err) {
          console.log(err);
        } else {
          if (i === 10000000) {
            console.log('COMPLETE');
          }
        }
      })
    }
  }
  return new Promise((resolve, reject) => {
    resolve();
  });
};

let reviewList = createReviews();

Promise.resolve(entries(1, 100000))
.then(() => entries(100001, 200000))
.then(() => entries(200001, 300000))
.then(() => entries(300001, 400000))
.then(() => entries(400001, 500000))
.then(() => entries(500001, 600000))
.then(() => entries(600001, 700000))
.then(() => entries(700001, 800000))
.then(() => entries(800001, 900000))
.then(() => entries(900001, 1000000))
.catch(err => console.log(err));