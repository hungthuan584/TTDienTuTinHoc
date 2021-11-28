const express = require('express');
const route = express.Router();

const LienHeController = require('../controllers/LienHe.controller');

route.get('/', LienHeController.getAll);

route.post('/', LienHeController.addNew);

route.patch('/:id', LienHeController.isRead);

route.patch('/', LienHeController.readAll);

module.exports = route;