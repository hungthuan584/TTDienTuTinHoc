const RoomModel = require('../models/Room.model');

// Get All
exports.getAllRoom = (req, res) => {
    RoomModel.getAllRoom((err, Room) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json({ status: 1, massage: 'Selected Data Successfully!', data: Room });
    });
}

// Get By Id
exports.getRoomById = (req, res) => {
    RoomModel.getRoomById(req.params.room_id, (err, Room) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json({ status: 1, massage: 'Selected Data Successfully!', data: Room });
    });
}

// Create
exports.createRoom = (req, res) => {
    const RoomReqData = new RoomModel(req.body);
    RoomReqData.room_isDelete = 0;
    RoomReqData.room_deleteDate = '-  -     :  :';
    RoomReqData.room_updateDate = '-  -     :  :';
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
    }
    else {
        RoomModel.createRoom(RoomReqData, (err, Room) => {
            if (err) {
                return res.json({ status: 0, massage: err });
            }
            return res.json({ status: 1, massage: 'Created Successfully', data: Room });
        });
    }
}

// Update
exports.updateRoomById = (req, res) => {
    const RoomReqData = new RoomModel(req.body);
    // Check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, massage: 'Please fill all fields' });
    } else {
        RoomModel.updateRoomById(req.params.room_id, RoomReqData, (err, Room) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Updated Successfully' });
        });
    }
}


// Delete
exports.deleteRoomById = (req, res) => {
    RoomModel.deleteRoomById(req.params.room_id, (err, Room) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Deleted Successfully' });
    });
}