const express = require('express');
const router = express.Router();
const controller = require('../controllers/book.controller');

const upload = require('../middlewares/multer');
const { validateBook } = require('../middlewares/validations');

// LISTADO
router.get('/', controller.index);

// FORM CREAR
router.get('/create', controller.createForm);


router.post('/create', upload.single('cover'), validateBook, controller.create);

router.get('/:id', controller.detail);


// EDITAR
router.get('/:id/edit', controller.editForm);
router.post('/:id/edit', upload.single('cover'), controller.update);


// ELIMINAR
router.get('/:id/delete', controller.deleteForm);
router.post('/:id/delete', controller.delete);

module.exports = router;