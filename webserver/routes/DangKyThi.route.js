const express = require('express');
const route = express.Router();

const DangKyController = require('../controllers/DangKyThi.controller');

route.get('/dotthi/:dtId', DangKyController.getByDotThi);

route.get('/hocvien/:hvId', DangKyController.getByHocVien);

route.get('/chungchi/:ccId', DangKyController.getByChungChi);

route.get('/danhsachduthi/:dtId', DangKyController.getAllHocVienDuThi);

route.get('/danhsach/:dtId/:ccId', DangKyController.getHocVienDuThiByCC);

route.patch('/confirm/:hvId', DangKyController.confirmByHV);

route.post('/multiple', DangKyController.addMultiple);

route.post('/confirmAuto', DangKyController.confirmAuto);

route.post('/', DangKyController.addNew);

route.delete('/:hvId', DangKyController.deleteByHV);

module.exports = route;