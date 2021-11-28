const express = require('express');
const route = express.Router();

const ChucNangController = require('../controllers/ChucNang.controller');

route.get('/', ChucNangController.getAll);

module.exports = route;