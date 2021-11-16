const express = require('express');
const route = express.Router();

const NhanVienController = require('../controllers/NhanVien.controller');

route.get('/', NhanVienController.getAll);

route.get('/thongtin/:id', NhanVienController.getById);

route.post('/', NhanVienController.addNew);

route.put('/:id', NhanVienController.updateById);

route.delete(':/id', NhanVienController.deleteById);

module.exports = route;