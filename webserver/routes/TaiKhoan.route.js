const express = require('express');
const route = express.Router();

const TaiKhoanController = require('../controllers/TaiKhoan.controller');

// Get All
route.get('/nhanvien', TaiKhoanController.getTaiKhoanEmployees);
route.get('/giaovien', TaiKhoanController.getTaiKhoanTeachers);
route.get('/hocvien', TaiKhoanController.getTaiKhoanStudents);

// Get By Username
route.get('/:TK_TenDangNhap', TaiKhoanController.getTaiKhoanByUsername);
// Create
route.post('/manager', TaiKhoanController.addTaiKhoanByManager);
route.post('/register', TaiKhoanController.addTaiKhoanByRegister);
// Update
route.put('update/:TK_TenDangNhap', TaiKhoanController.updateTaiKhoan);
// Blocked
route.put('blocked/:TK_TenDangNhap', TaiKhoanController.blockedTaiKhoan);
// Active
route.put('active/:TK_TenDangNhap', TaiKhoanController.activeTaiKhoan);

module.exports = route;