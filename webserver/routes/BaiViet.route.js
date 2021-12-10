const express = require('express');
const route = express.Router();

const BaiVietController = require('../controllers/BaiViet.controller');

route.get('/new', BaiVietController.getNew);

route.get('/', BaiVietController.getAll);

route.get('/files/:filename', BaiVietController.getFile);

route.get('/thongtin/:id', BaiVietController.getById);

route.post('/', BaiVietController.addNew);

route.put('/:id', BaiVietController.updateById);

route.delete('/:id', BaiVietController.deleteById);

module.exports = route;