const express = require('express');
const route = express.Router();

const ChungChiController = require('../controllers/ChungChi.controller');

route.get('/', ChungChiController.getAll);

route.get('/:id', ChungChiController.getById);

module.exports = route;