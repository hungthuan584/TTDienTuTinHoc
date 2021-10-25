var dbConnect = require('../db.config');

var PhieuThu = function (PhieuThu) {
    this.HV_Id = PhieuThu.HV_Id
    this.LH_Id = PhieuThu.LH_Id;
    this.NV_Id = PhieuThu.NV_Id;
    this.UD_Id = PhieuThu.UD_Id;
    this.PT_SoTien = PhieuThu.PT_SoTien;
    this.PT_CreateDate = new Date();
    this.PT_IsComplete = PhieuThu.PT_IsComplete;
    this.PT_CompleteDate = new Date();
}

PhieuThu.getAll = (result) => {
    dbConnect.query(
        `
        SELECT *
        FROM PhieuThu pt
        JOIN HocVien hv ON hv.HV_Id = pt.HV_Id
        JOIN LopHoc lh ON lh.LH_Id = pt.LH_Id
        JOIN NhanVien nv ON nv.NV_Id = pt.NV_Id
        JOIN UuDai ud ON ud.UD_Id = pt.UD_Id
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

PhieuThu.getById = (id, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM PhieuThu pt
        JOIN HocVien hv ON hv.HV_Id = pt.HV_Id
        JOIN LopHoc lh ON lh.LH_Id = pt.LH_Id
        JOIN NhanVien nv ON nv.NV_Id = pt.NV_Id
        JOIN UuDai ud ON ud.UD_Id = pt.UD_Id
        WHERE pt.PT_Id = ?
        `,
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

PhieuThu.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO PhieuThu SET ?`,
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

PhieuThu.confirmComplete = (id, result) => {
    dbConnect.query(
        `
        UPDATE PhieuThu
        SET 
            PT_IsComplete = 1,
            PT_CompleteDate = CURRENT_TIMESTAMP()
        WHERE PT_Id = ?
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