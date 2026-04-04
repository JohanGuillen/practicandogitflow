const express = require('express');
const router = express.Router();
const controller = require('../controllers/author.controller');
const { validateAuthor } = require('../middlewares/validations');
const auth = require('../middlewares/auth');

// LISTADO
router.get('/', auth, controller.index);

// FORM CREAR
router.get('/create', auth, controller.createForm);
router.post('/create', auth, validateAuthor, controller.create);

// EDITAR
router.get('/:id/edit', auth, controller.editForm);
router.post('/:id/edit', auth, validateAuthor, controller.update);

// ELIMINAR
router.get('/:id/delete', auth, controller.deleteForm);
router.post('/:id/delete', auth, controller.delete);

module.exports = router;