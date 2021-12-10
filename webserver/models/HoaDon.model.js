var dbConnect = require('../db.config');

var HoaDon = function (HoaDon) {
    this.HD_Id = HoaDon.HD_Id;
    this.HV_Id = HoaDon.HV_Id;
    this.HD_NoiDung = HoaDon.HD_NoiDung;
    this.HD_SoTien = HoaDon.HD_SoTien;
    this.HD_IsComplete = HoaDon.HD_IsComplete;
    this.HD_CreateBy = HoaDon.HD_CreateBy;
    this.HD_CreateDate = new Date();
    this.HD_CompleteDate = new Date();
    this.HD_IsDelete = HoaDon.HD_IsDelete;
}

HoaDon.getAll = (result) => {
    dbConnect.query(
        `
        SELECT *
        FROM HoaDon hd
        JOIN HocVien hv ON hv.HV_Id = hd.HV_Id
        `,
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

HoaDon.getByComplete = (result) => {
    dbConnect.query(
        `SELECT *
        FROM HoaDon hd
        JOIN HocVien hv ON hv.HV_Id = hd.HV_Id
        WHERE hd.HD_IsComplete = 1`,
        (err, res) => {
            if (err) {
                console.log('Error While Selecting', err);
                result(null, err);
            }
            else {
                console.log('Select completed Successfully');
                result(null, res);
            }
        }
    );
}

HoaDon.getByInComplete = (result) => {
    dbConnect.query(
        `SELECT *
        FROM HoaDon hd
        JOIN HocVien hv ON hv.HV_Id = hd.HV_Id
        WHERE hd.HD_IsComplete = 0`,
        (err, res) => {
            if (err) {
                console.log('Error While Selecting', err);
                result(null, err);
            }
            else {
                console.log('Select incomplete Successfully');
                result(null, res);
            }
        }
    );
}

HoaDon.getByHocVien = (hvId, result) => {
    dbConnect.query(
        `SELECT *
        FROM HoaDon hd
        JOIN HocVien hv ON hv.HV_Id = hd.HV_Id
        WHERE hd.HV_Id = ?`,
        hvId,
        (err, res) => {
            if (err) {
                console.log('Error While Selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected By HV Successfully');
                result(null, res);
            }
        }
    );
}

HoaDon.getById = (id, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM HoaDon hd
        JOIN HocVien hv ON hv.HV_Id = hd.HV_Id
        WHERE hd.HD_Id = ?
        `, id,
        (err, res) => {
            if (err) {
                console.log('Error While Selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected By Id Successfully');
                result(null, res[0]);
            }
        }
    );
}

HoaDon.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO HoaDon SET ?`,
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

HoaDon.confirmComplete = (id, result) => {
    dbConnect.query(
        `
        UPDATE HoaDon
        SET 
            HD_IsComplete = 1,
            HD_CompleteDate = CURDATE()
        WHERE HD_Id = ?
        `,
        id,
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

module.exports = HoaDon;