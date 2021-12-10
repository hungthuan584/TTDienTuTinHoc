const express = require('express');
const route = express.Router();

const LopHocController = require('../controllers/LopHoc.controller');

// Danh sach
route.get('/opening', LopHocController.getOpening);

route.get('/completed', LopHocController.getCompleted);

// Get by Id
route.get('/thongtin/:id', LopHocController.getById);

route.get('/giaovien/:id', LopHocController.getByGiaoVien);

// Them
route.post('/', LopHocController.addNew);

// Sua 
route.put('/:id', LopHocController.updateById);

route.patch('/deactivate/:id', LopHocController.deActivate);

route.patch('/active/:id', LopHocController.activeRegister);
// Xoa
route.delete('/:id', LopHocController.isComplete);


module.exports = route;