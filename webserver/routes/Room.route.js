const express = require('express');
const route = express.Router();

const RoomController = require('../controllers/Room.controller');

// get all
route.get('/', RoomController.getAllRoom);

// get by id
route.get('/:room_id', RoomController.getRoomById);

// create
route.post('/', RoomController.createRoom);

// update
route.put('/:room_id', RoomController.updateRoomById);

// delete
route.delete('/:room_id', RoomController.deleteRoomById);

module.exports = route;