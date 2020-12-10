const { LoremIpsum } = require('lorem-ipsum');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

writer.pipe(fs.createWriteStream('data.csv'));

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
    let headingQuantity = Math.ceil(Math.random() * 3);
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

let reviewList = createReviews();

function csvWrite(cb) {
  let i = 10000000;
  let id = 0;
  let productID = 0;
  let write = () => {
    let ok = true;
    do {
      i--;
      id++;
      let count = Math.floor(Math.random() * 11);
      if (count > 0) {
        for (let r = 0; r < count; r++) {
          let index = Math.floor(Math.random() * reviewList.length);
          productID++;
          let data = {
            id: productID,
            product_id: id,
            username: reviewList[index].username,
            review_heading: reviewList[index].review_heading,
            review_text: reviewList[index].review_text,
            review_rating: reviewList[index].review_rating,
            created_at: reviewList[index].created_at
          };
          if (i === 0) {
            if (r === count - 1) {
              writer.write(data, cb);
            } else {
              ok = writer.write(data);
            }
          } else {
            ok = writer.write(data);
          }
        }
      } else if (i === 0) {
        cb();
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
}

csvWrite(() => writer.end());