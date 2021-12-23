const express = require('express');
const route = express.Router();

const KetQuaThiController = require('../controllers/KetQuaThi.controller');

route.get('/hocvien/:hvId/:ktId', KetQuaThiController.getInfo);

route.post('/multi', KetQuaThiController.addMulti);

route.post('/one', KetQuaThiController.addNew);

route.put('/capnhat/:hvId/:ktId', KetQuaThiController.updateByHV);

route.post('/danhsachdiem', KetQuaThiController.getDanhSachDiem);

route.post('/tra-cuu', KetQuaThiController.getByHocVien);
module.exports = route;