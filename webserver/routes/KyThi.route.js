const express = require('express');
const route = express.Router();

const KyThiController = require('../controllers/KyThi.controller');

route.get('/',KyThiController.getAll);

route.get('/thongtin/:id', KyThiController.getById);

route.get('/chungchi/:ccId', KyThiController.getByChungChi);

route.get('/dotthi/:dtId', KyThiController.getByDotThi);

route.post('/', KyThiController.addNew);

route.put('/:id', KyThiController.updateById);

module.exports = route;