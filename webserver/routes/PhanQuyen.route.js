const express = require('express');
const route = express.Router();

const PhanQuyenController = require('../controllers/PhanQuyen.controller');

route.get('/:username', PhanQuyenController.getByUsername);

route.post('/', PhanQuyenController.addNew);

route.delete('/:username/:id', PhanQuyenController.deleteByUsername);

module.exports = route;