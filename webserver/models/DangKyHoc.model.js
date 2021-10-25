var dbConnect = require('../db.config');

var DangKyHoc = function (DangKyHoc) {
    this.HV_Id = DangKyHoc.HV_Id;
    this.LH_Id = DangKyHoc.LH_Id;
    this.DKH_NgayDangKy = new Date();
}

DangKyHoc.getAll = (result) => {
    dbConnect.query(
        `
        SELECT *
        FROM DangKyHoc dk
        JOIN HocVien hv ON hv.HV_Id = dk.HV_Id
        JOIN LopHoc lh ON lh.LH_Id = dk.LH_Id
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
DangKyHoc.getByHocVien = (hvId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM DangKyHoc dk
        JOIN HocVien hv ON hv.HV_Id = dk.HV_Id
        JOIN LopHoc lh ON lh.LH_Id = dk.LH_Id
        WHERE dk.HV_Id = ?
        `,
        hvId,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected LH_Id successfully');
                result(null, res);
            }
        }
    );
}
DangKyHoc.getByLopHoc = (lhId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM DangKyHoc dk
        JOIN HocVien hv ON hv.HV_Id = dk.HV_Id
        JOIN LopHoc lh ON lh.LH_Id = dk.LH_Id
        WHERE dk.LH_Id = ?
        `,
        lhId,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected LH_Id successfully');
                result(null, res);
            }
        }
    );
}

DangKyHoc.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO DangKyHoc SET ?`,
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

module.exports = DangKyHoc;