// Installation des dépendances nécessaires
// npm install express mongoose bcryptjs dotenv

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require("./userConnect");
const User = require('./userModels');

const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();


// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB

connectDB();

// Configuration de la page 404
const path = require('path');
const fs = require('fs');


// Définition du chemin des vues
const viewsPath = path.join(__dirname, '../frontend/views');
app.set('views', viewsPath);

// ... autres configurations ...

app.get('/dashboard', (req, res) => {
    // Code pour gérer la requête et envoyer la réponse
    res.send('Bienvenue sur le tableau de bord');
});

app.use((req, res, next) => {
    const filePath = path.join(viewsPath, '404.html');
    if (fs.existsSync(filePath)) {
        res.status(404).sendFile(filePath);
    } else {
        console.error(`Le fichier 404.html n'a pas été trouvé à ${filePath}`);
        res.status(500).send('Erreur interne du serveur');
    }
});


// Route pour l'inscription

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const user = new User({
            email,
            password: hashedPassword
        });

        // Sauvegarder l'utilisateur
        await user.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
    }
});

// Route pour la connexion
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        res.json({ message: 'Connexion réussie' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});