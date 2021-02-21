const express = require('express')
const app = express()

const passwordRouter = require('./routes/passwords');
const authenticated = require('./middleware/authenticated');

app.get('/health', (req, res) => res.json({ server: 'OK' }));
app.use('/password', authenticated, passwordRouter);

app.use((err, req, res, next) => {
  res.status(err.status).send(err.message);
});

module.exports = app;
