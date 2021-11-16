const express = require('express');
const route = express.Router();

const TaiKhoanController = require('../controllers/TaiKhoan.controller');
const { checkToken } = require('../auth/token_validation');

route.get('/', TaiKhoanController.getAll);

route.get('/thongtin/:username', TaiKhoanController.getByUsername);

// Change
route.post('/change/:username', TaiKhoanController.changePassword);

// Reset
route.patch('/reset/:username', TaiKhoanController.resetPassword);

// Blocked
route.patch('/lock/:username', TaiKhoanController.blockedByUsername);
// Active
route.patch('/unlock/:username', TaiKhoanController.activeByUsername);

// Login
route.post('/login', TaiKhoanController.login);

module.exports = route;