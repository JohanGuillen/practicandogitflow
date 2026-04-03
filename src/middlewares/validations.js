// corrección en validaciones del sistema

const { Author, Category, Editorial } = require('../models');

//  LIBRO
exports.validateBook = async (req, res, next) => {

    const { title, year, AuthorId, CategoryId, EditorialId } = req.body;

    if (!title || !year || !AuthorId || !CategoryId || !EditorialId) {

        const authors = await Author.findAll();
        const categories = await Category.findAll();
        const editorials = await Editorial.findAll();

        return res.render('books/create', {
            error: 'Todos los campos del libro son obligatorios',
            authors,
            categories,
            editorials,
            data: req.body
        });
    }

    next();
};


// CATEGORÍA
exports.validateCategory = (req, res, next) => {

    const { name, description } = req.body;

    if (!name || !description) {
        return res.render('categories/create', {
            error: 'Todos los campos de la categoría son obligatorios',
            data: req.body
        });
    }

    next();
};


//  AUTOR
exports.validateAuthor = (req, res, next) => {

    const { name, email } = req.body;

    if (!name || !email) {
        return res.render('authors/create', {
            error: 'Todos los campos del autor son obligatorios',
            data: req.body
        });
    }

    next();
};


// EDITORIAL
exports.validateEditorial = (req, res, next) => {

    const { name, phone, country } = req.body;

    if (!name || !phone || !country) {
        return res.render('editorials/create', {
            error: 'Todos los campos de la editorial son obligatorios',
            data: req.body
        });
    }

    next();
};

//validaciones terminadas 