const express = require('express');
const route = express.Router();

const HocVienController = require('../controllers/HocVien.controller');


route.get('/', HocVienController.getAll);
// Danh sach
route.get('/studying', HocVienController.getStudying);

route.get('/studyed', HocVienController.getStudyed);

// Get by Id
route.get('/thongtin/:id', HocVienController.getById);

// Them
route.post('/', HocVienController.addNew);

// Sua 
route.put('/:id', HocVienController.updateById);

// Xoa
route.delete('/:id', HocVienController.deleteById);


module.exports = route;