// Mejora en crud editoriales y terminado

const { Editorial } = require('../models');

// LISTAR
exports.index = async (req, res) => {
    const editorials = await Editorial.findAll();
    res.render('editorials/index', { editorials });
};

// FORM CREAR
exports.createForm = (req, res) => {
    res.render('editorials/create');
};

// CREAR
exports.create = async (req, res) => {
    await Editorial.create(req.body);
    res.redirect('/editorials');
};

// FORM EDITAR
exports.editForm = async (req, res) => {
    const editorial = await Editorial.findByPk(req.params.id);
    res.render('editorials/edit', { editorial });
};

// EDITAR
exports.update = async (req, res) => {
    await Editorial.update(req.body, {
        where: { id: req.params.id }
    });
    res.redirect('/editorials');
};

// CONFIRMAR ELIMINAR
exports.deleteForm = async (req, res) => {
    const editorial = await Editorial.findByPk(req.params.id);
    res.render('editorials/delete', { editorial });
};

// ELIMINAR
exports.delete = async (req, res) => {
    await Editorial.destroy({
        where: { id: req.params.id }
    });
    res.redirect('/editorials');
};