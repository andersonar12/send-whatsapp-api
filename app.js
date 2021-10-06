const express = require('express');
const app = express();

const router = express.Router();
const whatsapp = require('./whats-app');

app.post('/whatsapp/sendmessage', whatsapp.sendMessage);

app.listen(3002, () => {
    console.log('conectado')
})



