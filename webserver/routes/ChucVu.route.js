const express = require('express');
const route = express.Router();

const ChucVuController = require('../controllers/ChucVu.controller');

route.get('/', ChucVuController.getAll);

module.exports = route;