//require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const reviewRouter = require('./routes/reviews.js')
const cors = require('cors');
const expressStaticGzip = require('express-static-gzip');

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.urlencoded());
app.use('/api/reviews', reviewRouter);

// app.use(express.static(path.join(__dirname, '../public')));
app.use('/', expressStaticGzip(path.join(__dirname, '../public'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  // setHeaders: (res, path) => {
  //   res.setHeader('Cache-Control', 'public, max-age=31536000');
  // }
}));
app.use('/:id', express.static(path.join(__dirname, '../public')));
// app.use('/api/reviews', require('./routes/reviews.js'));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

module.exports = app;
