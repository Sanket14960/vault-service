const mongoose = require('mongoose');
const { Schema } = mongoose;

const PasswordSchema = new Schema({
  owner: { type: String, required: true, index: true },
  name:  { type: String }, 
  username: { type: String }, 
  password:  { type: String }, 
  description:  { type: String }, 
});

module.exports = mongoose.model('password', PasswordSchema)