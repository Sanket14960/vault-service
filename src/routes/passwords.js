const express = require('express');
const router = express.Router();

const Password = require('../models/password')

//Stores password directly onto DB
router.post('/', (req,res) => {
  const addPassword = new Password(req.body)
  addPassword.save((err) => err ? res.json(err): res.json(addPassword))
});

//Used for the purpose of displaying all saved User passwords in frontend
router.get('/', ({query}, res) => {
  Password.find(query.owner ? { owner: query.owner } : {})
  .then(items => res.json(items))
  .catch(err => res.json(err))
});

//Delete specific passwords no longer required
router.delete('/',(req, res) => {
  Password.findByIdAndRemove()
    .then(() => res.json('sucess'))
    .catch(err => res.status(404).json('fail'));
});

module.exports = router; 