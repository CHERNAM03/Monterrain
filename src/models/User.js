const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // ... définition du schéma utilisateur
});

module.exports = mongoose.model('User', userSchema);