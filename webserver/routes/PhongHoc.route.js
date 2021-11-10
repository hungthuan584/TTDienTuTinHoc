const express = require('express');
const route = express.Router();

const PhongHocController = require('../controllers/PhongHoc.controller');

// get all
route.get('/', PhongHocController.getAll);

// get by id
route.get('/:id', PhongHocController.getById);

// create
route.post('/', PhongHocController.addNew);

// update
route.put('/:id', PhongHocController.updateById);

// delete
route.delete('/:id', PhongHocController.deleteById);

module.exports = route;