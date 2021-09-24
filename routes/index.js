const express = require('express');
const router = express.Router();

// @description Login/Landin page
// route GET /
router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login',
    });
})


// @description Dashboard/ Main
// route GET/dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

module.exports = router;