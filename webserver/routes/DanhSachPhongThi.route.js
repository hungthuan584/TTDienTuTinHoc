const express = require('express');
const route = express.Router();
const DanhSachPhongThiController = require('../controllers/DanhSachPhongThi.controller');

route.get('/dotthi/:dtId', DanhSachPhongThiController.getDanhSachPhongThiByDotThi);

route.post('/getdanhsach', DanhSachPhongThiController.getDanhSachPhongThi);

route.post('/addOne', DanhSachPhongThiController.addOne);

route.post('/', DanhSachPhongThiController.addNew);

route.delete('/hocvien/:hvId', DanhSachPhongThiController.deleteByHV);

module.exports = route;