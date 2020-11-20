const Generate = require('./seedGenerator.js');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

function createData() {
  let count = 0;
  writer.pipe(fs.createWriteStream('data.csv'));
  for (let i = 1; i <= 10000000; i++) {
    let id = i;
    Generate(id, (err, data) => {
      if (err) {
        console.log('ERROR GENERATING DATA: ', err);
        return err;
      } else {
        count++;
        for (let r = 0; r < data.length; r++) {
          writer.write({
            product_id: data[r].product_id,
            username: data[r].username,
            review_heading: data[r].review_heading,
            review_text: data[r].review_text,
            review_rating: data[r].review_rating,
            created_at: data[r].created_at
          })
        }
        if (count === 10000000) {
          writer.end();
          console.log('Seeding Complete');
        }
      }
    });
  }
  return;
}

createData();