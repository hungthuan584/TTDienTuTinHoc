const express = require('express');
const route = express.Router();

const HeThongController = require('../controllers/HeThong.controller');

route.get('/info', HeThongController.getInfo);

route.get('/config', HeThongController.getConfig);

route.put('/', HeThongController.updateSystem);

route.get('/hinhanh/:filename', HeThongController.getImages);

module.exports = route;