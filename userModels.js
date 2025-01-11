const mongoose = require('mongoose');


// Schéma utilisateur
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Modèle utilisateur
const User = mongoose.model('User', userSchema);

module.exports = User;