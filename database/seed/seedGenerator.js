const  { LoremIpsum } = require('lorem-ipsum');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

writer.pipe(fs.createWriteStream('data.csv'));

function generateReviews(start, stop) {
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
  let quantity = Math.floor(Math.random() * 11);
  for (let i = 0; i < quantity; i++) {
    let headingQuantity = Math.ceil(Math.random() * 3)
    let month = Math.ceil(Math.random() * 12);
    let day = Math.ceil(Math.random() * 28);
    let hour = Math.floor(Math.random() * 24);
    let minutes = Math.floor(Math.random() * 60);
    let seconds = Math.floor(Math.random() * 60);
    // let review =
    writer.write({
      product_id: start,
      username: lorem.generateWords(1),
      review_heading: lorem.generateWords(headingQuantity),
      review_text: lorem.generateParagraphs(1),
      review_rating: Math.ceil(Math.random() * 5),
      created_at: new Date(2020, month, day, hour, minutes, seconds).toISOString()
    })
    // reviews.push(review);
  }
  if (start === 10000000) {
    writer.end();
  }
  if (start === stop) {
    // writer.end();
    console.log('Seeding Complete');
    return 'Complete';
  } else {
    return generateReviews(start + 1, stop);
  }
  // cb(null, reviews);
  // return reviews;
}

function createFile() {
  for (let i = 1; i <= 1000; i++) {
    generateReviews(i, i * 10000);
  }
  return 'Done';
}

createFile();

module.exports = generateReviews;