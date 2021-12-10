const express = require('express');
const route = express.Router();

const HoaDonController = require('../controllers/HoaDon.controller');

route.get('/', HoaDonController.getAll);

route.get('/complete', HoaDonController.getByComplete);

route.get('/incomplete', HoaDonController.getByInComplete);

route.get('/hocvien/:hvId', HoaDonController.getByHocVien);

route.get('/thongtin/:id', HoaDonController.getById);

route.post('/learn/:hvId', HoaDonController.addLearn);

route.post('/exam', HoaDonController.addExam);

route.delete('/:id', HoaDonController.confirmComplete);

module.exports = route;