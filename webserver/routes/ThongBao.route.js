const express = require('express');
const route = express.Router();

const ThongBaoController = require('../controllers/ThongBao.controller');

route.get('/', ThongBaoController.getAll);

route.get('/:id', ThongBaoController.getById);

route.post('/', ThongBaoController.addNew);

route.put('/:id', ThongBaoController.updateById);

route.delete('/:id', ThongBaoController.deleteById);

module.exports = route;