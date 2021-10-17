const express = require('express');
const route = express.Router();

const CapDoTaiKhoanController = require('../controllers/CapDoTaiKhoan.controller');

// Get All
route.get('/', CapDoTaiKhoanController.getAllCapDo);

module.exports = route;