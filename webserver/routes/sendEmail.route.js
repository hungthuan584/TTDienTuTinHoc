const express = require('express');
const route = express.Router();

const sendEmailController = require('../controllers/sendEmail.controller');

route.post('/replyContact/:email', sendEmailController.replyContact);

route.post('/thongtin/:id', sendEmailController.sendAccount);

module.exports = route;