var mongoose = require('mongoose');

var dataSchema = mongoose.Schema({
  description: String,
  linkToRepo: String,
  linkToPic: String,
  user_id: String
});

module.exports = mongoose.model('Data', dataSchema);
