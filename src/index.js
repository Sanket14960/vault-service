const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// DB Config
const db = require('./config/keys').mongoURI;
console.log(db)

//Connect to Mongo
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


  
const app = express()
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

