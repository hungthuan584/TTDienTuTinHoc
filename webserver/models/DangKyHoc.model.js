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
        JOIN LopDaoTao ldt ON ldt.LDT_Id = lh.LDT_Id
        WHERE dk.HV_Id = ?
        `,
        hvId,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected HV_Id successfully');
                result(null, res);
            }
        }
    );
}

DangKyHoc.checkUnique = (lhId, hvId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM DangKyHoc
        WHERE (LH_Id = ?) AND (HV_Id = ?)
        `,
        [
            lhId, hvId
        ],
        (err, res) => {
            if (err) {
                console.log('Error while checking', err);
                result(null, err);
            } else {
                console.log('Checked successfully');
                result(null, res[0]);
            }
        }
    );
}

DangKyHoc.getByLopHoc = (lhId, result) => {
    dbConnect.query(
        `
        SELECT * FROM DangKyHoc dk
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

DangKyHoc.deleteByStudent = (hvId, result) => {
    dbConnect.query(
        `DELETE FROM DangKyHoc WHERE HV_Id = ?`,
        hvId,
        (err, res) => {
            if (err) {
                console.log('Error while deleting', err);
                result(null, err);
            } else {
                console.log('Deleted successfully');
                result(null, res);
            }
        }
    )
}

module.exports = DangKyHoc;