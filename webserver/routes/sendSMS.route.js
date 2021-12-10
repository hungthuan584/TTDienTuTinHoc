const express = require('express');
const route = express.Router();

const sendSMSController = require('../controllers/sendSMS.controller');

route.post('/:phone', sendSMSController.sendMessage);

module.exports = route;