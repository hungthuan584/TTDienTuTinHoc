const express = require('express');
const route = express.Router();

const DotThiController = require('../controllers/DotThi.controller');

route.get('/', DotThiController.getAll);

route.get('/current', DotThiController.getCurrent);

route.get('/thongtin/:id', DotThiController.getById);

route.post('/', DotThiController.addNew);

route.put('/:id', DotThiController.updateById);

route.patch('/complete/:id', DotThiController.completeById);

route.delete('/:id',DotThiController.lockRegister)

module.exports = route;