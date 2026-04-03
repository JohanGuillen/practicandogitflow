
const { Author } = require('../models');

// LISTAR
exports.index = async (req, res) => {
    const authors = await Author.findAll();
    res.render('authors/index', { authors });
};

// FORM CREAR
exports.createForm = (req, res) => {
    res.render('authors/create');
};

// CREAR
exports.create = async (req, res) => {
    await Author.create(req.body);
    res.redirect('/authors');
};

// FORM EDITAR
exports.editForm = async (req, res) => {
    const author = await Author.findByPk(req.params.id);
    res.render('authors/edit', { author });
};

// EDITAR
exports.update = async (req, res) => {
    await Author.update(req.body, {
        where: { id: req.params.id }
    });
    res.redirect('/authors');
};

// CONFIRMAR ELIMINAR
exports.deleteForm = async (req, res) => {
    const author = await Author.findByPk(req.params.id);
    res.render('authors/delete', { author });
};

// ELIMINAR
exports.delete = async (req, res) => {
    await Author.destroy({
        where: { id: req.params.id }
    });
    res.redirect('/authors');
};