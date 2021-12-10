const express = require('express');
const route = express.Router();

const ThoiGianHocController = require('../controllers/ThoiGianHoc.controller');

route.get('/', ThoiGianHocController.getAll);

module.exports = route;