const dbConnect = require('../db.config');

var LienHe = function (LienHe) {
    this.CT_HoTen = LienHe.CT_HoTen;
    this.CT_Sdt = LienHe.CT_Sdt;
    this.CT_Email = LienHe.CT_Email;
    this.CT_NoiDung = LienHe.CT_NoiDung;
    this.CT_IsRead = LienHe.CT_IsRead;
    this.CT_CreateDate = new Date();
}

LienHe.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM LienHe`,
        (err, res) => {
            if (err) {
                console.log('Error while selecting', err);
                result(null, err);
            } else {
                console.log('Selected successfully!');
                result(null, res);
            }
        }
    );
}

LienHe.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO LienHe SET ?`,
        data,
        (err, res) => {
            if (err) {
                console.log('Error while creating', err);
                result(null, err);
            } else {
                console.log('Created successfully!');
                result(null, res);
            }
        }
    );
}

LienHe.isRead = (id, result) => {
    dbConnect.query(
        `UPDATE LienHe SET CT_IsRead = 1 WHERE CT_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while mark', err);
                result(null, err);
            } else {
                console.log('Mark successfully!');
                result(null, res);
            }
        }
    );
}

LienHe.readAll = (result) => {
    dbConnect.query(
        `UPDATE LienHe SET CT_IsRead = 1`,
        (err, res) => {
            if (err) {
                console.log('Error while mark all', err);
                result(null, err);
            } else {
                console.log('Mark all successfully!');
                result(null, res);
            }
        }
    );
}

module.exports = LienHe;