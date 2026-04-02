const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

const sequelize = require('./config/database');


sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch(err => console.log(err));

// ======================
// CONFIG
// ======================
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/layouts'));
hbs.registerHelper('ifEquals', function(a, b, options) {
    return a == b ? options.fn(this) : options.inverse(this);
});

//  ESTO ACTIVA EL LAYOUT POR DEFECTO
app.set('view options', { layout: 'layouts/layout' });
// ======================
// MIDDLEWARES
// ======================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// STATIC
app.use(express.static(path.join(__dirname, 'public')));

// ======================
// ROUTES
// ======================
const routes = require('./routes/index.routes');
app.use('/', routes);

// ======================
// ERROR
// ======================
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

module.exports = app;