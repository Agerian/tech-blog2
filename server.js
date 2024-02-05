
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const routes = require('./controllers');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session({
    secret: 'Super secret secret',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
    }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});