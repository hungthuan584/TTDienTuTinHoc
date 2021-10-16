const express = require('express');
const route = express.Router();

const PhongHocController = require('../controllers/PhongHoc.controller');

// get all
route.get('/', PhongHocController.getAllPhongHoc);

// get by id
route.get('/:PH_Id', PhongHocController.getPhongHocById);

// create
route.post('/', PhongHocController.addPhongHoc);

// update
route.put('/:PH_Id', PhongHocController.updatePhongHocById);

// delete
route.delete('/:PH_Id', PhongHocController.deletePhongHocById);

module.exports = route;