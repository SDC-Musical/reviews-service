const Generate = require('./seedGenerator.js');
const postgres = require('postgres');

const sql = postgres('postgres://root@localhost:5432/product_reviews');

function seed() {
  for (let i = 1; i <= 1000; i++) {
    let current = Generate(i);
      for (let i = 0; i < current.length; i++) {
        sql`
          insert into reviews (
            product_id, username, review_heading, review_text, review_rating, created_at) values (
              current[i].product_id, current[i].username, current[i].review_heading, current[i].review_text, current[i].review_rating, current[i].created_at
          )
        `
      }
  }
  console.log('Complete');
}

seed();