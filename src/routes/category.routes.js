const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const { validateCategory } = require('../middlewares/validations');


router.get('/', controller.index);
router.get('/create', controller.createForm);
router.post('/create', validateCategory, controller.create);

router.get('/:id/edit', controller.editForm);
router.post('/:id/edit', validateCategory, controller.update);

router.get('/:id/delete', controller.deleteForm);
router.post('/:id/delete', controller.delete);

module.exports = router;