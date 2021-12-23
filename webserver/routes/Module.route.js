const express = require('express');
const route = express.Router();
const ModuleController = require('../controllers/Module.controller');

route.get('/', ModuleController.getAll);

route.get('/nangcao', ModuleController.getAdvanced);

module.exports = route;