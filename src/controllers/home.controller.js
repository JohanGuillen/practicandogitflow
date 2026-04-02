const { Book, Category, Author, Editorial } = require('../models');
const { Op } = require('sequelize');

exports.index = async (req, res) => {

    const { search, category } = req.query;

    let where = {};

    // FILTRO POR NOMBRE
    if (search) {
        where.title = {
            [Op.like]: `%${search}%`
        };
    }

    // FILTRO POR CATEGORÍA
    if (category) {
        where.CategoryId = category;
    }

    const books = await Book.findAll({
        where,
        include: [Author, Category, Editorial]
    });

    const categories = await Category.findAll();
    const authors = await Author.findAll();

    res.render('home/index', {
        books,
        categories,
        authors,
        search
    });
};