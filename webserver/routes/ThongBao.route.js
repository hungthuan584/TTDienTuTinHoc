const express = require('express');
const route = express.Router();

const ThongBaoController = require('../controllers/ThongBao.controller');

route.get('/', ThongBaoController.getAll);

route.get('/thongtin/:id', ThongBaoController.getById);

route.get('/lophoc/:id', ThongBaoController.getByLopHoc);

route.post('/', ThongBaoController.addNew);

route.put('/:id', ThongBaoController.updateById);

route.delete('/:id', ThongBaoController.deleteById);

module.exports = route;