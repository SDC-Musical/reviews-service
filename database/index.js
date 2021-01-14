const pass = require('./dbpass.js');
const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  password: pass.pass,
  host: '3.19.63.99',
  database: 'postgres'
});

client.connect(err => {
  if (err) {
    console.log('PROBLEM CONNECTING TO DATABASE: ', err.stack)
  } else {
    console.log('CONNECTED')
  }
});

// const mongoose = require('mongoose');

// const mongoUri = (process.env.NODE_ENV === 'production')
//   ? 'mongodb://mongo:27017/reviews-service'
//   : 'mongodb://localhost/reviews-service';

// mongoose.connect(mongoUri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

// const db = mongoose.connection;
// db.on('error', () => console.error('Connection Error'));
// db.once('open', () => console.log('Connected to MongoDB'));
