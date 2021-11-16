const express = require('express');
const route = express.Router();

const DangKyHocController = require('../controllers/DangKyHoc.controller');

route.get('/lophoc/:id', DangKyHocController.getByLopHoc);

module.exports = route;