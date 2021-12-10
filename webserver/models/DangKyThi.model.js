var dbConnect = require('../db.config');

var DangKyThi = function (DangKyThi) {
    this.HV_Id = DangKyThi.HV_Id;
    this.KT_Id = DangKyThi.KT_Id;
    this.DKT_NgayDangKy = new Date();
}

DangKyThi.getAll = (result) => {
    dbConnect.query(
        `
        SELECT *
        FROM DangKyThi dk
        JOIN HocVien hv ON hv.HV_Id = dk.HV_Id
        JOIN KyThi kt ON kt.KT_Id = dk.KT_Id
        `,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

DangKyThi.getByHocVien = (hvId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM DangKyThi dk
        JOIN HocVien hv ON hv.HV_Id = dk.HV_Id
        JOIN KyThi kt ON kt.KT_Id = dk.KT_Id
        WHERE dk.HV_Id = ?
        `,
        hvId,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected by HV_Id successfully');
                result(null, res[0]);
            }
        }
    );
}

DangKyThi.getByKyThi = (ktId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM DangKyThi dk
        JOIN HocVien hv ON hv.HV_Id = dk.HV_Id
        JOIN KyThi kt ON kt.KT_Id = dk.KT_Id
        WHERE dk.KT_Id = ?
        `,
        ktId,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected by KT_Id successfully');
                result(null, res);
            }
        }
    );
}

DangKyThi.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO DangKyThi SET ?`,
        data,
        (err, res) => {
            if (err) {
                console.log('Error while creating', err);
                result(null, err);
            } else {
                console.log('Created successfully');
                result(null, res);
            }
        }
    );
}

DangKyThi.deleteByHV = (hvId, result) => {
    dbConnect.query(
        `DELETE FROM DangKyThi WHERE HV_Id = ?`,
        hvId,
        (err, res) => {
            if (err) {
                console.log('Error while delete', err);
                result(null, err);
            } else {
                console.log('Deleted successfully');
                result(null, res);
            }
        }
    );
}

module.exports = DangKyThi;