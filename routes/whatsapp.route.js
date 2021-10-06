const express = require('express');
const { getQRfromWs, sendMessage } = require('../controllers/whatsapp.controller');

const router = express.Router();

router.route('/login').get(getQRfromWs);
router.route('/sendmessage').post(sendMessage);

module.exports = router;