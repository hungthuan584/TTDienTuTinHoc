const dbConnect = require('../db.config');

var ThoiGianHoc = function (ThoiGianHoc) {
    this.TG_Id = ThoiGianHoc.TG_Id;
    this.TG_ThoiGianHoc = ThoiGianHoc.TG_ThoiGianHoc;
}

ThoiGianHoc.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM ThoiGianHoc`,
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

ThoiGianHoc.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO ThoiGianHoc SET ?`,
        (err, res) => {
            if (err) {
                console.log('Error while create', err);
                result(null, err);
            }
            else {
                console.log('Created successfully');
                result(null, res);
            }
        }
    )
}

module.exports = ThoiGianHoc;