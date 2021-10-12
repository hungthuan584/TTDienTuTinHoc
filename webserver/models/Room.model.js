var dbConnect = require('../db.config');

var Room = function (Room) {
    this.room_name = Room.room_name;
    this.room_slot = Room.room_slot;
    this.room_createDate = new Date();
    this.room_updateDate = new Date();
    this.room_isDelete = Room.room_isDelete;
    this.room_deleteDate = new Date();
}

// Get all
Room.getAllRoom = (result) => {
    dbConnect.query(
        `SELECT * FROM room WHERE room_isDelete != 1`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Fetching Successfully');
                result(null, res);
            }
        }
    );
}

// Get by Id
Room.getRoomById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM room WHERE room_isDelete != 1 AND room_id = ${id}`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Fetching Successfully');
                result(null, res);
            }
        }
    );
}

// Create
Room.createRoom = (RoomReqData, result) => {
    dbConnect.query(
        `INSERT INTO room SET ? `,
        RoomReqData,
        (err, res) => {
            if (err) {
                console.log('Error While Creating New Data', err);
                result(null, err);
            }
            else {
                console.log('Data Created Successfully');
                result(null, res);
            }
        }
    );
}

// Update
Room.updateRoomById = (id, RoomReqData, result) => {
    dbConnect.query(
        `UPDATE room SET room_name = ?, room_slot = ?, room_updateDate = current_timestamp() WHERE room_id = ?`,
        [
            RoomReqData.room_name,
            RoomReqData.room_slot,
            id
        ], (err, res) => {
            if (err) {
                console.log('Error While Updating Data');
                result(err, null);
            } else {
                console.log('Data Updated Successfully!');
                result(null, res);
            }
        });
}

// Delete
Room.deleteRoomById = (id, result) => {
    dbConnect.query(
        `UPDATE room SET room_isDelete = 1, room_deleteDate = current_timestamp() WHERE room_id = ${id}`,
        (err, res) => {
            if (err) {
                console.log('Error While Deleting Data');
                result(err, null);
            } else {
                console.log('Data Deleted Successfully!');
                result(null, res)
            }
        }
    );
}

module.exports = Room;