const express = require('express');
const route = express.Router();

const ChungChiController = require('../controllers/ChungChi.controller');

route.get('/', ChungChiController.getAll);

module.exports = route;