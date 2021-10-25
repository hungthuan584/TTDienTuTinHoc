var dbConnect = require('../db.config');

var DangKyThi = function (DangKyThi) {
    this.HV_Id = DangKyThi.HV_Id;
    this.KT_Id = DangKyThi.KT_Id;
    this.VB_Id = DangKyThi.VB_Id;
    this.DKT_NgayDangKy = new Date();
}

DangKyThi.getAll = (result) => {
    dbConnect.query(
        `
        SELECT *
        FROM DangKyThi dk
        JOIN HocVien hv ON hv.HV_Id = dk.HV_Id
        JOIN KyThi kt ON kt.KT_Id = dk.KT_Id
        JOIN VanBang vb ON vb.VB_Id = dk.VB_Id
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
        JOIN VanBang vb ON vb.VB_Id = dk.VB_Id
        WHERE dk.HV_Id = ?
        `,
        hvId,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected by HV_Id successfully');
                result(null, res);
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
        JOIN VanBang vb ON vb.VB_Id = dk.VB_Id
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

DangKyThi.getByVanBang = (vbId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM DangKyThi dk
        JOIN HocVien hv ON hv.HV_Id = dk.HV_Id
        JOIN KyThi kt ON kt.KT_Id = dk.KT_Id
        JOIN VanBang vb ON vb.VB_Id = dk.VB_Id
        WHERE dk.VB_Id = ?
        `,
        vbId,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected by VB_Id successfully');
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

module.exports = DangKyThi;