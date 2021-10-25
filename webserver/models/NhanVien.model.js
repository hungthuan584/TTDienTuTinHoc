var dbConnect = require('../db.config');

var NhanVien = function (NhanVien) {
    this.NV_Id = NhanVien.NV_Id;
    this.NV_HoTen = NhanVien.NV_HoTen;
    this.NV_GioiTinh = NhanVien.NV_GioiTinh;
    this.NV_NgaySinh = new Date();
    this.NV_Cmnd = NhanVien.NV_Cmnd;
    this.NV_DiaChi = NhanVien.NV_DiaChi;
    this.NV_Sdt = NhanVien.NV_Sdt;
    this.NV_Email = NhanVien.NV_Email;
    this.NV_TenDangNhap = NhanVien.NV_TenDangNhap;
    this.NV_ChucVu = NhanVien.NV_ChucVu;
    this.NV_CreateDate = new Date();
    this.NV_UpdateDate = new Date();
    this.NV_IsDelete = NhanVien.NV_IsDelete;
    this.NV_DeleteDate = new Date();
}

NhanVien.getAll = (result) => {
    dbConnect.query(
        `SELECT * NhanVien WHERE NV_IsDelete != 1`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            } else {
                console.log('Selected Successfully');
                result(null, res);
            }
        }
    );
}

NhanVien.getById = (id, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM NhanVien
        WHERE NV_Id = ?
        `,
        id,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            } else {
                console.log('Selected By Id Successfully');
                result(null, res);
            }
        }
    );
}

NhanVien.getByUsername = (username, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM NhanVien
        WHERE TK_TenDangNhap = ?
        `,
        username,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected By Username Successfully');
                result(null, res);
            }
        }
    );
}

NhanVien.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO NhanVien SET ?`,
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

NhanVien.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE NhanVien
        SET 
            NV_HoTen = ?,
            NV_GioiTinh = ?,
            NV_NgaySinh = ?,
            NV_Cmnd = ?,
            NV_DiaChi = ?,
            NV_Sdt = ?,
            NV_Email = ?,
            NV_ChucVu = ?,
            NV_UpdateDate = CURRENT_TIMESTAMP()
        WHERE NV_Id = ?, 
        `,
        [
            data.NV_HoTen,
            data.NV_GioiTinh,
            data.NV_NgaySinh,
            data.NV_Cmnd,
            data.NV_DiaChi,
            data.NV_Sdt,
            data.NV_Email,
            data.NV_ChucVu,
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error while updating', err);
                result(null, err);
            } else {
                console.log('Updated successfully');
                result(null, res);
            }
        }
    );
}

NhanVien.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE NhanVien
        SET
            NV_IsDelete = 1,
            NV_DeleteDate = CURRENT_TIMESTAMP()
        WHERE NV_Id = ?
        `,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while deleting', err);
                result(null, err);
            } else {
                console.log('Deleted successfully');
                result(null, res);
            }
        }
    );
}

module.exports = NhanVien;
