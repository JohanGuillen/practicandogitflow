const express = require('express');
const router = express.Router();

router.use('/', require('./home.routes'));
router.use('/categories', require('./category.routes'));
router.use('/authors', require('./author.routes'));
router.use('/editorials', require('./editorial.routes'));
router.use('/books', require('./book.routes'));
module.exports = router;