const pass = require('./dbpass.js');
const { Pool, Client } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: pass.pass,
  host: '3.23.61.41',
  database: 'postgres'
});

pool.connect(err => {
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
