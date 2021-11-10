const express = require('express');
const route = express.Router();

const LopDaoTaoController = require('../controllers/LopDaoTao.controller');

// Danh sach
route.get('/', LopDaoTaoController.getAll);

// Get by Id
route.get('/:id', LopDaoTaoController.getById);

// Them
route.post('/', LopDaoTaoController.addLopDaoTao);

// Sua 
route.put('/:id', LopDaoTaoController.updateById);

// Xoa
route.delete('/:id', LopDaoTaoController.deleteById);

module.exports = route;