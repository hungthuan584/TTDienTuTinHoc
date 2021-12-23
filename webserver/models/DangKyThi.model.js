var dbConnect = require('../db.config');

var DangKyThi = function (DangKyThi) {
    this.DT_Id = DangKyThi.DT_Id;
    this.HV_Id = DangKyThi.HV_Id;
    this.CC_Id = DangKyThi.CC_Id;
    this.DKT_Module = DangKyThi.DKT_Module;
    this.DKT_NgayDangKy = new Date();
}

DangKyThi.getByDotThi = (dtId, result) => {
    dbConnect.query(
        `
        SELECT * FROM dangkythi dkt
        JOIN hocvien hv ON hv.HV_Id = dkt.HV_Id
        JOIN hoadon hd ON hd.HV_Id = hv.HV_Id
        JOIN chungchi cc ON cc.CC_Id = dkt.CC_Id
        WHERE (dkt.HV_Id NOT IN (SELECT HV_Id FROM danhsachphongthi)) AND (dkt.DKT_IsConfirm != 1 ) AND (dkt.DT_Id = ?)
        `, dtId,
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
        JOIN HoaDon hd ON hd.HV_Id = hv.HV_Id
        JOIN ChungChi cc ON cc.CC_Id = dk.CC_Id
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

DangKyThi.getByChungChi = (ktId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM DangKyThi dk
        JOIN HocVien hv ON hv.HV_Id = dk.HV_Id
        JOIN HoaDon hd ON hd.HV_Id = hv.HV_Id
        JOIN ChungChi cc ON cc.CC_Id = dk.CC_Id
        WHERE dk.CC_Id = ?
        ORDER BY dk.HV_Id DESC, dk.DKT_NgayDangKy DESC
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

DangKyThi.getHocVienDuThi = (dtId, data, result) => {
    dbConnect.query(
        `SELECT *
        FROM dangkythi dk
        JOIN hocvien hv ON hv.HV_Id = dk.HV_Id
        JOIN ChungChi cc ON cc.CC_Id = dk.CC_Id
        WHERE (dk.DKT_IsConfirm = 1) AND (dk.HV_Id NOT IN (SELECT HV_ID FROM danhsachphongthi)) AND (dk.DT_Id = ${dtId}) ${data}`,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected by DT successfully');
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

DangKyThi.addMultiple = (data, result) => {
    let query = 'INSERT INTO DangKyThi ( HV_Id, DT_ID, CC_Id, DKT_Module, DKT_IsConfirm) VALUES';
    for (let i = 0; i < data.length; i++) {
        if (i == data.length - 1) {
            query += `('${data[i].HV_Id}',${data[i].DT_Id},'${data[i].CC_Id}','${data[i].DKT_Module}',${data[i].DKT_IsConfirm});`;
        } else {
            query += `('${data[i].HV_Id}',${data[i].DT_Id},'${data[i].CC_Id}','${data[i].DKT_Module}',${data[i].DKT_IsConfirm}),`;
        }
    }
    dbConnect.query(
        query,
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

DangKyThi.confirmByHV = (hvId, result) => {
    dbConnect.query(
        `UPDATE DangKyThi SET DKT_IsConfirm = 1 WHERE HV_Id = ?`,
        hvId,
        (err, res) => {
            if (err) {
                console.log('Error while confirm', err);
                result(null, err);
            } else {
                console.log('Confirmed successfully');
                result(null, res);
            }
        }
    );
}

module.exports = DangKyThi;