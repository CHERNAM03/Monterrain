

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/MonTerrain');
        console.log('Connexion à MongoDB réussie !');
    } catch (err) {
        console.log('Connexion à MongoDB échouée !', err);
    }
};

module.exports = connectDB
