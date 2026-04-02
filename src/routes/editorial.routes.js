const express = require('express');
const router = express.Router();
const controller = require('../controllers/editorial.controller');
const { validateEditorial } = require('../middlewares/validations');

router.get('/', controller.index);
router.get('/create', controller.createForm);
router.post('/create', validateEditorial, controller.create);

router.get('/:id/edit', controller.editForm);
router.post('/:id/edit', validateEditorial, controller.update);

router.get('/:id/delete', controller.deleteForm);
router.post('/:id/delete', controller.delete);

module.exports = router;