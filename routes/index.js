const express = require('express');
const router = express.Router();

// Define your routes

// Index route
router.get('/', (req, res) => {
    // Render the index.pug template
    res.render('index', { title: 'Página Inicial' });
});

module.exports = router;