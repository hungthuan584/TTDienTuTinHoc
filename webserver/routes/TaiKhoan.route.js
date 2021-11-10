const express = require('express');
const route = express.Router();

const TaiKhoanController = require('../controllers/TaiKhoan.controller');
const { checkToken } = require('../auth/token_validation');

route.get('/', TaiKhoanController.getAll);

route.get('/:username', TaiKhoanController.getByUsername);
// Change
route.put('/:username', TaiKhoanController.changePassword);
// Reset
route.patch('/:username', TaiKhoanController.resetPassword);

// Blocked
route.lock('/:username', TaiKhoanController.blockedByUsername);
// Active
route.unlock('/:username', TaiKhoanController.activeByUsername);
// Login
route.post('/login', TaiKhoanController.login);

module.exports = route;