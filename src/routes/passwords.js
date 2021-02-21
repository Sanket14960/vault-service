const express = require('express')
const router = express.Router();

const { v4: uuidv4 } = require('uuid');

router.param('id', (req, res, next, value, name) => {
  // Give 'value' is the password ID and req.user contains details related to the user of the service.
  // Fetch the encrypted password and decrypt it using a derived key add it to the req.password
  next();
})

router.get('/', (req, res) => {
  // Given the request, use the info present at req.user, extract a list of passwords for that given user.
  // limit to only ID,  service, name, description and username fields.
  res.json([{id: uuidv4(), service: 'amazon.com', name: 'Amazon', description: '', username: 'some-username'}])
})

router.get('/:id', (req, res) => {
  const { params, password, user } = req;
  // given the request, id is the password id, req.user contains user information, req.password contains the password from the datastore.
  // decrypt the password to level 1 encryption and then send the encrypted data back.

  res.json({ id: uuidv4(), service: 'amazon.com', name: 'Amazon', description: '', username: 'some-username', password: 'lvl1-enc-pass' })
})

module.exports = router;
