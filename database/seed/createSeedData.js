const Generate = require('./seedGenerator.js');
const fs = require('fs');

function createData() {
  let data = {};
  for (let i = 1; i <= 10000000; i++) {
    data[i] = Generate.generateReviews(i);
  }
  let jsonText = JSON.stringify(data);
  fs.writeFile('seedData.json', jsonText, 'utf8', err => {
    if (err) {
      console.log('ERROR WRITING FILE: ', err);
    } else {
      console.log('File Saved!');
    }
  })
  return 'Complete';
}

createData();