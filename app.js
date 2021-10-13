const express = require('express');
const path = require('path');

const app = express();

const whatsAppRoutes = require('./routes/whatsapp.route');
const viewsController = require('./controllers/views.controller');
/* const whatsapp = require('./whats-app'); */

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// serving static files
app.use(express.static(path.join(__dirname, 'public')));
/* Para las imagenes */
app.use(express.static(path.join(__dirname, 'public/img')))

app.use(express.json());

app.get('/signin', viewsController.signin);
app.use('/whatsapp', whatsAppRoutes);


app.listen(3002, () => {
    console.log('conectado')
})



