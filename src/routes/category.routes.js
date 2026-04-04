const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const { validateCategory } = require('../middlewares/validations');
const auth = require('../middlewares/auth');

// LISTAR (usa solo uno)
router.get('/', auth, controller.index);

// CREAR
router.get('/create', auth, controller.createForm);
router.post('/create', auth, validateCategory, controller.create);

// EDITAR
router.get('/:id/edit', auth, controller.editForm);
router.post('/:id/edit', auth, validateCategory, controller.update);

// ELIMINAR
router.get('/:id/delete', auth, controller.deleteForm);
router.post('/:id/delete', auth, controller.delete);

module.exports = router;