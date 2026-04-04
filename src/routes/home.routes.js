const express = require('express');
const router = express.Router();
const controller = require('../controllers/home.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, controller.index);

module.exports = router;