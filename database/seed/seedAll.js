const  { LoremIpsum } = require('lorem-ipsum');
const postgres = require('postgres');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const Promise = require('bluebird');

// writer.pipe(fs.createWriteStream('data.csv'));

// const sql = postgres('postgres://root@localhost:5432/product_reviews');

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

let entries = function(start, stop, file) {
  writer.pipe(fs.createWriteStream(`data${file}.csv`));
  for (let i = start; i <= stop; i++) {
    let quantity = Math.floor(Math.random() * 6);
    for (let j = 0; j < quantity; j++) {
      let index = Math.floor(Math.random() * reviewList.length);
      // const [new_review] = sql`
      //   insert into reviews (
      //     product_id, username, review_heading, review_text, review_ratiing, created_at
      //   ) values (
      //     i, reviewList[index].username, reviewList[index].review_heading, reviewList[index].review_text, reviewList[index].review_rating, reviewList[index].created_at
      //   )

      //   returning *
      // `;
      writer.write({
        product_id: i,
        username: reviewList[index].username,
        review_heading: reviewList[index].review_heading,
        review_text: reviewList[index].review_text,
        review_rating: reviewList[index].review_rating,
        created_at: reviewList[index].created_at
      })
    }
  }
  return new Promise((resolve, reject) => {
    resolve();
  });
};

let reviewList = createReviews();

let runLoop = function() {
  let begin = 1;
  let end = 100000;
  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      Promise.resolve(entries(begin, end, i))
      .then(() => {
        begin += 100000;
        end += 100000;
        console.log(`File ${i} Section ${j} Complete`);
        if (end > 10000000) {
          writer.end();
        }
      })
      .catch(err => console.log(err));
    }
  }
}

runLoop();

// Promise.resolve(entries(1, 100000, 1))
// .then(() => entries(100001, 200000, 1))
// .then(() => entries(200001, 300000, 1))
// .then(() => entries(300001, 400000, 1))
// .then(() => entries(400001, 500000, 1))
// .then(() => entries(500001, 600000, 1))
// .then(() => entries(600001, 700000, 1))
// .then(() => entries(700001, 800000, 1))
// .then(() => entries(800001, 900000, 1))
// .then(() => entries(900001, 1000000, 1))
// Promise.resolve(entries(1000001, 1100000, 2))
// .then(() => entries(1100001, 1200000, 2))
// .then(() => entries(1200001, 1300000, 2))
// .then(() => entries(1300001, 1400000, 2))
// .then(() => entries(1400001, 1500000, 2))
// .then(() => entries(1500001, 1600000, 2))
// .then(() => entries(1600001, 1700000, 2))
// .then(() => entries(1700001, 1800000, 2))
// .then(() => entries(1800001, 1900000, 2))
// .then(() => entries(1900001, 2000000, 2))
// Promise.resolve(entries(2000001, 2100000, 3))
// .then(() => entries(2100001, 2200000, 3))
// .then(() => entries(2200001, 2300000, 3))
// .then(() => entries(2300001, 2400000, 3))
// .then(() => entries(2400001, 2500000, 3))
// .then(() => entries(2500001, 2600000, 3))
// .then(() => entries(2600001, 2700000, 3))
// .then(() => entries(2700001, 2800000, 3))
// .then(() => entries(2800001, 2900000, 3))
// .then(() => entries(2900001, 3000000, 3))
// Promise.resolve(entries(3000001, 3100000, 4))
// .then(() => entries(3100001, 3200000, 4))
// .then(() => entries(3200001, 3300000, 4))
// .then(() => entries(3300001, 3400000, 4))
// .then(() => entries(3400001, 3500000, 4))
// .then(() => entries(3500001, 3600000, 4))
// .then(() => entries(3600001, 3700000, 4))
// .then(() => entries(3700001, 3800000, 4))
// .then(() => entries(3800001, 3900000, 4))
// .then(() => entries(3900001, 4000000, 4))
// Promise.resolve(entries(4000001, 4100000, 5))
// .then(() => entries(4100001, 4200000, 5))
// .then(() => entries(4200001, 4300000, 5))
// .then(() => entries(4300001, 4400000, 5))
// .then(() => entries(4400001, 4500000, 5))
// .then(() => entries(4500001, 4600000, 5))
// .then(() => entries(4600001, 4700000, 5))
// .then(() => entries(4700001, 4800000, 5))
// .then(() => entries(4800001, 4900000, 5))
// .then(() => entries(4900001, 5000000, 5))
// Promise.resolve(entries(5000001, 5100000, 6))
// .then(() => entries(5100001, 5200000, 6))
// .then(() => entries(5200001, 5300000, 6))
// .then(() => entries(5300001, 5400000, 6))
// .then(() => entries(5400001, 5500000, 6))
// .then(() => entries(5500001, 5600000, 6))
// .then(() => entries(5600001, 5700000, 6))
// .then(() => entries(5700001, 5800000, 6))
// .then(() => entries(5800001, 5900000, 6))
// .then(() => entries(5900001, 6000000, 6))
// Promise.resolve(entries(6000001, 6100000, 7))
// .then(() => entries(6100001, 6200000, 7))
// .then(() => entries(6200001, 6300000, 7))
// .then(() => entries(6300001, 6400000, 7))
// .then(() => entries(6400001, 6500000, 7))
// .then(() => entries(6500001, 6600000, 7))
// .then(() => entries(6600001, 6700000, 7))
// .then(() => entries(6700001, 6800000, 7))
// .then(() => entries(6800001, 6900000, 7))
// .then(() => entries(6900001, 7000000, 7))
// Promise.resolve(entries(7000001, 7100000, 8))
// .then(() => entries(7100001, 7200000, 8))
// .then(() => entries(7200001, 7300000, 8))
// .then(() => entries(7300001, 7400000, 8))
// .then(() => entries(7400001, 7500000, 8))
// .then(() => entries(7500001, 7600000, 8))
// .then(() => entries(7600001, 7700000, 8))
// .then(() => entries(7700001, 7800000, 8))
// .then(() => entries(7800001, 7900000, 8))
// .then(() => entries(7900001, 8000000, 8))
// Promise.resolve(entries(8000001, 8100000, 9))
// .then(() => entries(8100001, 8200000, 9))
// .then(() => entries(8200001, 8300000, 9))
// .then(() => entries(8300001, 8400000, 9))
// .then(() => entries(8400001, 8500000, 9))
// .then(() => entries(8500001, 8600000, 9))
// .then(() => entries(8600001, 8700000, 9))
// .then(() => entries(8700001, 8800000, 9))
// .then(() => entries(8800001, 8900000, 9))
// .then(() => entries(8900001, 9000000, 9))
// Promise.resolve(entries(9000001, 9100000, 10))
// .then(() => entries(9100001, 9200000, 10))
// .then(() => entries(9200001, 9300000, 10))
// .then(() => entries(9300001, 9400000, 10))
// .then(() => entries(9400001, 9500000, 10))
// .then(() => entries(9500001, 9600000, 10))
// .then(() => entries(9600001, 9700000, 10))
// .then(() => entries(9700001, 9800000, 10))
// .then(() => entries(9800001, 9900000, 10))
// .then(() => entries(9900001, 10000000, 10))
// .then(() => writer.end())
// .catch(err => console.log(err));