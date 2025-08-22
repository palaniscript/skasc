const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  gender: String,
  mobile: String,
  email: String,
});

module.exports = mongoose.model('Student', studentSchema);
