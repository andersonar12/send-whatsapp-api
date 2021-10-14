const express = require('express');
const { getQRfromWs, sendMessage,checkLoggin,logoutUser } = require('../controllers/whatsapp.controller');
const viewsController = require('../controllers/views.controller');

const router = express.Router();

router.route('/signin').get(viewsController.signin);
router.route('/login').get(getQRfromWs);
router.route('/logout').get(logoutUser);
router.route('/check-login').get(checkLoggin);
router.route('/sendmessage').post(sendMessage);

module.exports = router;