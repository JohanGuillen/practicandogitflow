const { Category, Book } = require('../models');

// LISTAR
exports.index = async (req, res) => {

    const categories = await Category.findAll({
        include: [{
            model: Book,
            attributes: []
        }],
        attributes: {
            include: [
                [
                    require('sequelize').fn('COUNT', require('sequelize').col('Books.id')),
                    'totalBooks'
                ]
            ]
        },
        group: ['Category.id']
    });

    res.render('categories/index', { categories });
};

// FORM CREAR
exports.createForm = (req, res) => {
    res.render('categories/create');
};

// CREAR
exports.create = async (req, res) => {
    await Category.create(req.body);
    res.redirect('/categories');
};

// FORM EDITAR
exports.editForm = async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    res.render('categories/edit', { category });
};

// EDITAR
exports.update = async (req, res) => {
    await Category.update(req.body, {
        where: { id: req.params.id }
    });
    res.redirect('/categories');
};

// CONFIRMAR ELIMINAR
exports.deleteForm = async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    res.render('categories/delete', { category });
};

// ELIMINAR
exports.delete = async (req, res) => {
    await Category.destroy({
        where: { id: req.params.id }
    });
    res.redirect('/categories');
};