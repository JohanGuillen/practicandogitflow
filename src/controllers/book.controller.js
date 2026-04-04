// Crud libros terminado

const { Book, Author, Category, Editorial } = require('../models');
const upload = require('../middlewares/multer');
const mail = require('../services/mail.service');

// LISTAR
exports.index = async (req, res) => {
    const books = await Book.findAll({
        include: [Author, Category, Editorial]
    });
    res.render('books/index', { books });
};

// FORM CREAR
exports.createForm = async (req, res) => {

    const authors = await Author.findAll();
    const categories = await Category.findAll();
    const editorials = await Editorial.findAll();

   
    if (authors.length === 0 || categories.length === 0 || editorials.length === 0) {
        return res.render('books/create', {
            error: 'No se puede crear libro porque faltan autores, categorías o editoriales',
            authors,
            categories,
            editorials
        });
    }

    res.render('books/create', {
        authors,
        categories,
        editorials
    });
};

exports.create = async (req, res) => {
    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        await Book.create({
            title: req.body.title,
            year: req.body.year,
            AuthorId: parseInt(req.body.AuthorId),
            CategoryId: parseInt(req.body.CategoryId),
            EditorialId: parseInt(req.body.EditorialId),
            cover: req.file ? req.file.filename : null
        });

        res.redirect('/books');

    } catch (error) {
        console.log("🔥 ERROR REAL:", error);
        res.send('Error al crear libro');
    }
};

exports.detail = async (req, res) => {
    try {

        const book = await Book.findByPk(req.params.id, {
            include: [Author, Category, Editorial]
        });

        if (!book) {
            return res.send('Libro no encontrado');
        }

        res.render('books/detail', { book });

    } catch (error) {
        console.log(error);
        res.send('Error al cargar detalle');
    }
};

// FORM EDITAR
exports.editForm = async (req, res) => {
    const book = await Book.findByPk(req.params.id);

    const authors = await Author.findAll();
    const categories = await Category.findAll();
    const editorials = await Editorial.findAll();

    res.render('books/edit', {
        book,
        authors,
        categories,
        editorials
    });
};

// EDITAR
exports.update = async (req, res) => {
    try {
        const { title, year, AuthorId, CategoryId, EditorialId } = req.body;

        await Book.update(
            {
                title,
                year,
                AuthorId: parseInt(AuthorId),
                CategoryId: parseInt(CategoryId),
                EditorialId: parseInt(EditorialId)
            },
            {
                where: { id: req.params.id }
            }
        );

        res.redirect('/books');

    } catch (error) {
        console.log("🔥 ERROR UPDATE:", error);

        const authors = await Author.findAll();
        const categories = await Category.findAll();
        const editorials = await Editorial.findAll();

        res.render('books/edit', {
            error: 'Error al actualizar',
            book: req.body,
            authors,
            categories,
            editorials
        });
    }
};

// CONFIRMAR ELIMINAR
exports.deleteForm = async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.render('books/delete', { book });
};


// ELIMINAR
exports.delete = async (req, res) => {
    await Book.destroy({
        where: { id: req.params.id }
    });
    res.redirect('/books');
};