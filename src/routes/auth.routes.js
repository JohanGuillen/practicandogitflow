const express = require('express');
const router = express.Router();

// Mostrar login
router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }

    const error = req.query.error ? 'Credenciales incorrectas' : null;

 res.render('auth/login', { 
    error,
    isLogin: true
 
});
});

// Procesar login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin@test.com' && password === '123456') {
        req.session.user = email;
        return res.redirect('/');
    } else {
        return res.redirect('/login?error=1'); 
    }
});
// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;