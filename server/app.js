require('newrelic');
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const reviewRouter = require('./routes/reviews.js');
import App from '../client/components/App';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.urlencoded());
app.use('/api/reviews', reviewRouter);

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('../public/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong: ', err);
      return res.status(500).send('Internal Server Error');
    }
    return res.send(
      data.replace('<div id="reviews-service"></div>', `<div id="reviews-service">${app}</div>`)
    );
  });
});

app.use(express.static(path.join(__dirname, '../public')));

app.use('/:id', express.static(path.join(__dirname, '../public')));
// app.use('/api/reviews', require('./routes/reviews.js'));

// app.get('*', (req, res) => {
//   const html = renderToString(
//     <App />
//   );
//   res.render(path.join(__dirname, '../public/index.pug'), {
//     app: html
//   });
// });

module.exports = app;
