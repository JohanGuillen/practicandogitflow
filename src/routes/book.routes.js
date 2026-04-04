const express = require('express');
const router = express.Router();
const controller = require('../controllers/book.controller');

const upload = require('../middlewares/multer');
const { validateBook } = require('../middlewares/validations');
const auth = require('../middlewares/auth');

// LISTADO
router.get('/', auth, controller.index);

// CREAR
router.get('/create', auth, controller.createForm);
router.post('/create', auth, upload.single('cover'), validateBook, controller.create);

// DETALLE
router.get('/:id', auth, controller.detail);

// EDITAR
router.get('/:id/edit', auth, controller.editForm);
router.post('/:id/edit', auth, upload.single('cover'), controller.update);

// ELIMINAR
router.get('/:id/delete', auth, controller.deleteForm);
router.post('/:id/delete', auth, controller.delete);

module.exports = router;