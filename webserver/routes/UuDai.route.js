const express = require('express');
const route = express.Router();

const UuDaiController = require('../controllers/UuDai.controller');

route.get('/', UuDaiController.getAll);

route.get('/:id', UuDaiController.getById);

route.post('/', UuDaiController.addNew);

route.put('/:id', UuDaiController.updateById);

route.delete('/:id', UuDaiController.deleteById);

module.exports = route;