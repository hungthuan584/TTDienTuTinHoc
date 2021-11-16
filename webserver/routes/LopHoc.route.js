const express = require('express');
const route = express.Router();

const LopHocController = require('../controllers/LopHoc.controller');

// Danh sach
route.get('/', LopHocController.getAll);

// Get by Id
route.get('/:id', LopHocController.getById);

// Them
route.post('/', LopHocController.addNew);

// Sua 
route.put('/:id', LopHocController.updateById);

route.patch('/:id', LopHocController.deActivate);
// Xoa
route.delete('/:id', LopHocController.isComplete);


module.exports = route;