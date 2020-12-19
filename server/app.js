// require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const reviewRouter = require('./routes/reviews.js');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('../client/components/App');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('../public/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.log('Error Reading File: ', err);
      return res.status(500).send('Server Error.');
    }

    return res.send(
      data.replace('<div id="reviews-service"></div>', `<div id="reviews-service">${app}</div>`)
    );
  });
});
app.use('/api/reviews', reviewRouter);


app.use(express.static(path.join(__dirname, '../public')));
app.use('/:id', express.static(path.join(__dirname, '../public')));
// app.use('/api/reviews', require('./routes/reviews.js'));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

module.exports = app;
