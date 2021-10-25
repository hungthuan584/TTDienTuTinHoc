var dbConnect = require('../db.config');

var UuDai = function (UuDai) {
    this.UD_Ten = UuDai.UD_Ten;
    this.UD_GiamGia = UuDai.UD_GiamGia;
    this.UD_BatDau = new Date();
    this.UD_KetThuc = new Date();
    this.UD_CreateDate = new Date();
    this.UD_UpdateDate = new Date();
    this.UD_IsDelete = UuDai.UD_IsDelete;
    this.UD_DeleteDate = new Date();
}

UuDai.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM UuDai WHERE UD_IsDelete != 1`,
        (err, res) => {
            if (err) {
                console.log('Error While Selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected Successfully');
                result(null, res);
            }
        }
    );
}

UuDai.getById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM UuDai WHERE UD_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error While Selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected By Id Successfully');
                result(null, res);
            }
        }
    );
}

UuDai.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO UuDai SET ?`,
        data,
        (err, res) => {
            if (err) {
                console.log('Error While Creating', err);
                result(null, err);
            }
            else {
                console.log('Created Successfully');
                result(null, res);
            }
        }
    );
}

UuDai.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE UuDai
        SET 
            UD_Ten = ?,
            UD_GiamGia = ?,
            UD_BatDau = ?,
            UD_KetThuc = ?,
            UD_UpdateDate = CURRENT_TIMESTAMP()
        WHERE UD_Id = ?
        `,
        [
            data.UD_Ten,
            data.UD_GiamGia,
            data.UD_BatDau,
            data.UD_KetThuc,
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error While Updating', err);
                result(null, err);
            }
            else {
                console.log('Updated Successfully');
                result(null, res);
            }
        }
    );
}

UuDai.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE UuDai
        SET 
            UD_IsDelete = 1,
            UD_DeleteDate = CURRENT_TIMESTAMP()
        WHERE UD_Id = ?
        `,
        id,
        (err, res) => {
            if (err) {
                console.log('Error While Deleting', err);
                result(null, err);
            }
            else {
                console.log('Deleted Successfully');
                result(null, res);
            }
        }
    );
}

module.exports = UuDai;