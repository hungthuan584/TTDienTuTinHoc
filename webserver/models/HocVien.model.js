var dbConnect = require('../db.config');

var HocVien = function (HocVien) {
    this.HV_Id = HocVien.HV_Id;
    this.HV_HoTen = HocVien.HV_HoTen;
    this.HV_GioiTinh = HocVien.HV_GioiTinh;
    this.HV_NgaySinh = HocVien.HV_NgaySinh;
    this.HV_NoiSinh = HocVien.HV_NoiSinh;
    this.HV_Cmnd = HocVien.HV_Cmnd;
    this.HV_NgayCapCmnd = HocVien.HV_NgayCapCmnd;
    this.HV_NoiCapCmnd = HocVien.HV_NoiCapCmnd;
    this.HV_DanToc = HocVien.HV_DanToc;
    this.HV_QuocTich = HocVien.HV_QuocTich;
    this.HV_Sdt = HocVien.HV_Sdt;
    this.HV_Email = HocVien.HV_Email;
    this.HV_Mssv = HocVien.HV_Mssv;
    this.TK_TenDangNhap = HocVien.TK_TenDangNhap;
    this.HV_IsDelete = HocVien.HV_IsDelete;
    this.HV_CreateDate = new Date();
    this.HV_UpdateDate = new Date();
    this.HV_DeleteDate = new Date();
}

// Danh sach hoc vien
HocVien.getStudying = (result) => {
    dbConnect.query(
        `
        SELECT *
        FROM hocvien hv
        JOIN taikhoan tk ON tk.TK_TenDangNhap = hv.TK_TenDangNhap
        WHERE tk.TK_IsActive != 0
        `,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Selected Successfully');
                result(null, res);
            }
        }
    );
}
HocVien.getStudyed = (result) => {
    dbConnect.query(
        `
        SELECT *
        FROM hocvien hv
        JOIN taikhoan tk ON tk.TK_TenDangNhap = hv.TK_TenDangNhap
        WHERE tk.TK_IsActive = 0
        `,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Selected Successfully');
                result(null, res);
            }
        }
    );
}

// Danh sach hoc vien dang ky nam hien tai
HocVien.countNumber = (result) => {
    dbConnect.query(
        `SELECT * FROM HocVien WHERE YEAR(HV_CreateDate) = YEAR(CURDATE())`,
        (err, res) => {
            if (err) {
                console.log('Error :', err);
                result(null, err);
            }
            else {
                console.log('Successfully');
                result(null, res);
            }
        }
    );
}

// Get hoc vien by Id
HocVien.getById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM HocVien hv
        JOIN TaiKhoan tk ON tk.TK_TenDangNhap = hv.TK_TenDangNhap
        WHERE hv.HV_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while selecting', err);
                result(null, err);
            }
            else {
                console.log('Fetching by id successfully');
                result(null, res[0]);
            }
        }
    );
}

// Them hoc vien
HocVien.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO HocVien SET ?`,
        data,
        (err, res) => {
            if (err) {
                console.log('Error while creating', err);
                result(null, err);
            }
            else {
                console.log('Created successfully');
                result(null, res);
            }
        }
    );
}

// Sua thong tin hoc vien
HocVien.updateById = (id, data, result) => {
    dbConnect.query(
        `UPDATE HocVien SET HV_HoTen = ?, HV_GioiTinh = ?,HV_NgaySinh = ?, HV_NoiSinh = ?, HV_Cmnd = ?, HV_NgayCapCmnd = ?, HV_NoiCapCmnd = ?,HV_DanToc = ?, HV_QuocTich = ?, HV_Sdt = ?, HV_Email = ?,HV_Mssv = ?, HV_UpdateDate = CURRENT_TIMESTAMP() WHERE HV_Id = ?`,
        [
            data.HV_HoTen,
            data.HV_GioiTinh,
            data.HV_NgaySinh,
            data.HV_NoiSinh,
            data.HV_Cmnd,
            data.HV_NgayCapCmnd,
            data.HV_NoiCapCmnd,
            data.HV_DanToc,
            data.HV_QuocTich,
            data.HV_Sdt,
            data.HV_Email,
            data.HV_Mssv,
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error While Updating Data', err);
                result(err, null);
            } else {
                console.log('Data Updated Successfully!');
                result(null, res);
            }
        }
    );
}

// Xoa hoc vien
HocVien.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE HocVien
        SET
            HV_IsDelete = 1,
            HV_DeleteDate = CURRENT_TIMESTAMP()
        WHERE HV_Id = ?
        `,
        id,
        (err, res) => {
            if (err) {
                console.log('Error While Delete Data', err);
                result(err, null);
            } else {
                console.log('Data Deleted Successfully!');
                result(null, res);
            }
        }
    );
}

module.exports = HocVien;