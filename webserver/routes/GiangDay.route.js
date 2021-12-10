const express = require('express');
const route = express.Router();

const GiangDayController = require('../controllers/GiangDay.controller');

route.get('/', GiangDayController.getAll);

route.get('/giaovien/:gvId', GiangDayController.getByGV);

route.get('/lophoc/:lhId', GiangDayController.getByLH);

route.post('/', GiangDayController.addNew);

route.put('/:LH_Id', GiangDayController.updateByLH);

module.exports = route;