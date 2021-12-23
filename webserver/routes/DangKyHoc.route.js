const express = require('express');
const route = express.Router();

const DangKyHocController = require('../controllers/DangKyHoc.controller');

route.get('/lophoc/:id', DangKyHocController.getByLopHoc);

route.get('/hocvien/:hv_id', DangKyHocController.getByHocVien);

route.get('/:lh_id/:hv_id', DangKyHocController.checkUnique);

route.post('/', DangKyHocController.addNew);

route.delete('/:id', DangKyHocController.deleteByStudent);

module.exports = route;