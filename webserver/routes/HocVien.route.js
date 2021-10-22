const express = require('express');
const route = express.Router();

const HocVienController = require('../controllers/HocVien.controller');

// Danh sach
route.get('/', HocVienController.getAllHocVien);

// Get by Current year
route.get('/current', HocVienController.getHocVienByCreateYear);

// Get by Id
route.get('/info/:HV_Id', HocVienController.getHocVienById);

// Them
route.post('/', HocVienController.addHocVien);

// Sua 
route.put('/:HV_Id', HocVienController.updateHocVien);

// Xoa
route.delete('/:HV_Id', HocVienController.deleteHocVien);


module.exports = route;