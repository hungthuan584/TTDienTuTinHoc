var dbConnect = require('../db.config');

var UuDai = function (UuDai) {
    this.UD_Id = UuDai.UD_Id;
    this.UD_Ten = UuDai.UD_Ten;
    this.UD_GiamGia = UuDai.UD_GiamGia;
    this.UD_BatDau = UuDai.UD_BatDau;
    this.UD_KetThuc = UuDai.UD_KetThuc;
    this.UD_IsDelete = UuDai.UD_IsDelete;
    this.UD_CreateDate = new Date();
    this.UD_UpdateDate = new Date();
    this.UD_DeleteDate = new Date();
}

UuDai.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM UuDai WHERE UD_IsDelete != 1`,
        (err, res) => {
            if (err) {
                console.log('Error while selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

UuDai.countNumber = (result) => {
    dbConnect.query(
        `SELECT * FROM UuDai WHERE YEAR(UD_CreateDate) = YEAR(CURDATE())`,
        (err, res) => {
            if (err) {
                console.log('Error while counting');
                result(null, err);
            }
            else {
                console.log('Counted successfully');
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
                console.log('Error while selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected by id successfully');
                result(null, res[0]);
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
                console.log('Error while creating', err);
                result(null, err);
            }
            else {
                console.log('Created successfully');
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
                console.log('Error while updating', err);
                result(null, err);
            }
            else {
                console.log('Updated successfully');
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
                console.log('Error while deleting', err);
                result(null, err);
            }
            else {
                console.log('Deleted successfully');
                result(null, res);
            }
        }
    );
}

module.exports = UuDai;