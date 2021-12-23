const express = require('express');
const route = express.Router();

const ThongKeController = require('../controllers/ThongKe.controller');

route.post('/lophoc', ThongKeController.getByLopHoc);

route.post('/hocvien', ThongKeController.getByHocVien);

route.post('/giaovien', ThongKeController.getByGiaoVien);

route.post('/khoathi', ThongKeController.getByKhoaThi);

module.exports = route;