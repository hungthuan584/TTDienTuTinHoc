const express = require('express');
const route = express.Router();

const LopDaoTaoController = require('../controllers/LopDaoTao.controller');

// Danh sach
route.get('/', LopDaoTaoController.getAllLopDaoTao);

// Get by Id
route.get('/:LDT_Id', LopDaoTaoController.getLopDaoTaoById);

// Them
route.post('/', LopDaoTaoController.addLopDaoTao);

// Sua 
route.put('/:LDT_Id', LopDaoTaoController.updateLopDaoTao);

// Xoa
route.delete('/:LDT_Id', LopDaoTaoController.deleteLopDaoTao);


module.exports = route;