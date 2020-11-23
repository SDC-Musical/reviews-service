const Generate = require('./seedGenerator.js');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

writer.pipe(fs.createWriteStream('data.csv'));

function createData(product) {
  // let count = 1;
  // for (let i = 1; i <= 10000000; i++) {
  //   let id = i;
    Generate(product, (err, data) => {
      if (err) {
        console.log('ERROR GENERATING DATA: ', err);
        return err;
      } else {
        // count++;
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
        if (product === 10000000) {
          writer.end();
          console.log('Seeding Complete');
        } else {
          createData(product + 1);
        }
      }
    });
  // }
  return;
}

createData(1);