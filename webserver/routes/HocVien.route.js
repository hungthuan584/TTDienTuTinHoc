const express = require('express');
const route = express.Router();

const HocVienController = require('../controllers/HocVien.controller');

// Danh sach
route.get('/', HocVienController.getAll);

// Get by Id
route.get('/:id', HocVienController.getById);

// Them
route.post('/', HocVienController.addNew);

// Sua 
route.put('/:id', HocVienController.updateById);

// Xoa
route.delete('/:id', HocVienController.deleteById);


module.exports = route;