const express = require('express');
const route = express.Router();

const PhongHocController = require('../controllers/PhongHoc.controller');

// get all
route.get('/', PhongHocController.getAll);

route.get('/phongthi/:ktId', PhongHocController.getPhongThi);

// get by id
route.get('/thongtin/:id', PhongHocController.getById);

// create
route.post('/', PhongHocController.addNew);

// update
route.put('/:id', PhongHocController.updateById);

// delete
route.delete('/:id', PhongHocController.deleteById);

module.exports = route;