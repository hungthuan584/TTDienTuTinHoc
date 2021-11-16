const express = require('express');
const route = express.Router();

const PhanQuyenController = require('../controllers/PhanQuyen.controller');

route.get('/check/:username/:functionId', PhanQuyenController.checkPermission);

module.exports = route;