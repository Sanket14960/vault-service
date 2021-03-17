const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express()

app.use(express.json());

dotenv.config();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/passwords', require('./routes/passwords'))
app.use('/users', require('./routes/users'))

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

