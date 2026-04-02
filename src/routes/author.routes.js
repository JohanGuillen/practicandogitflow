const express = require('express');
const router = express.Router();
const controller = require('../controllers/author.controller');
const { validateAuthor } = require('../middlewares/validations');

router.get('/', controller.index);
router.get('/create', controller.createForm);
router.post('/create', validateAuthor, controller.create);

router.get('/:id/edit', controller.editForm);
router.post('/create', validateAuthor, controller.create);

router.get('/:id/delete', controller.deleteForm);
router.post('/:id/delete', controller.delete);

module.exports = router;