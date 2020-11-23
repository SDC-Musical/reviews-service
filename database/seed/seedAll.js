const  { LoremIpsum } = require('lorem-ipsum');
const postgres = require('postgres');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

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
  return;
};

let reviewList = createReviews();

entries(1, 1000000, 1);
entries(1, 1000000, 2);
entries(1, 1000000, 3);
entries(1, 1000000, 4);
entries(1, 1000000, 5);
entries(1, 1000000, 6);
entries(1, 1000000, 7);
entries(1, 1000000, 8);
entries(1, 1000000, 9);
entries(1, 1000000, 10);