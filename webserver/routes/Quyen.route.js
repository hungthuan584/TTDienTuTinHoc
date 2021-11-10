const express = require('express');
const route = express.Router();

const QuyenController = require('../controllers/Quyen.controller');

// Get All
route.get('/', QuyenController.getAll);

module.exports = route;