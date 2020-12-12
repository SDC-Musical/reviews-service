require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const reviewRouter = require('./routes/reviews.js')

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.urlencoded());
app.use('/api/reviews', reviewRouter);

app.use(express.static(path.join(__dirname, '../public')));
app.use('/:id', express.static(path.join(__dirname, '../public')));
// app.use('/api/reviews', require('./routes/reviews.js'));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

module.exports = app;
