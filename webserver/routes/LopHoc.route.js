const express = require('express');
const route = express.Router();

const LopHocController = require('../controllers/LopHoc.controller');

// Danh sach
route.get('/', LopHocController.getAllLopHoc);

// Get by Id
route.get('/:LH_Id', LopHocController.getLopHocById);

// Them
route.post('/', LopHocController.addLopHoc);

// Sua 
route.put('/:LH_Id', LopHocController.updateLopHoc);

// Xoa
route.delete('/:LH_Id', LopHocController.deleteLopHoc);


module.exports = route;