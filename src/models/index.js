const sequelize = require('../config/database');

const Book = require('./Book');
const Author = require('./Author');
const Category = require('./Category');
const Editorial = require('./Editorial');

// Relaciones
Book.belongsTo(Author);
Book.belongsTo(Category);
Book.belongsTo(Editorial);

Author.hasMany(Book);
Category.hasMany(Book);
Editorial.hasMany(Book);

module.exports = {
    sequelize,
    Book,
    Author,
    Category,
    Editorial
};