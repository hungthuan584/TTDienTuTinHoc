const express = require('express');
const route = express.Router();
const ThoiGianThiController = require('../controllers/ThoiGianThi.controller');
route.get('/', ThoiGianThiController.getAll);

module.exports = route;