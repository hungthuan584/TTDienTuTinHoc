const express = require('express');
const route = express.Router();

const GiaoVienController = require('../controllers/GiaoVien.controller');

route.get('/', GiaoVienController.getAll);

route.get('/:id', GiaoVienController.getById);

route.post('/', GiaoVienController.addNew);

route.put('/:id', GiaoVienController.updateById);

route.patch('/:id', GiaoVienController.changeInfo);

route.delete('/:id', GiaoVienController.deleteById);

module.exports = route;