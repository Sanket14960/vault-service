const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const PasswordSchema = new Schema({
  owner: { type: String, required: true, index: true },
  name:  { type: String }, 
  username: { type: String }, 
  password:  { type: String }, 
  description:  { type: String }, 
});

PasswordSchema.pre('hash', async function (next) {
  try{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = mongoose.model('password', PasswordSchema)