const express = require('express');
const path = require('path');

const app = express();

const whatsAppRoutes = require('./routes/whatsapp.route');
const viewsController = require('./controllers/views.controller');
const whatsapp = require('./whats-app');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/signin', viewsController.signin);

app.use('/whatsapp', whatsAppRoutes);


app.listen(3002, () => {
    console.log('conectado')
})



