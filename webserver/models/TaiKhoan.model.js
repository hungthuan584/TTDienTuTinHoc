var dbConnect = require('../db.config');

var TaiKhoan = function (TaiKhoan) {
    this.TK_TenDangNhap = TaiKhoan.TK_TenDangNhap;
    this.LV_Id = TaiKhoan.LV_Id;
    this.TK_MatKhau = TaiKhoan.TK_MatKhau;
    this.TK_HoTen = TaiKhoan.TK_HoTen;
    this.TK_GioiTinh = TaiKhoan.TK_GioiTinh;
    this.TK_SinhNhat = TaiKhoan.TK_SinhNhat;
    this.TK_Cmnd = TaiKhoan.TK_Cmnd;
    this.TK_DiaChi = TaiKhoan.TK_DiaChi;
    this.TK_Sdt = TaiKhoan.TK_Sdt;
    this.TK_Email = TaiKhoan.TK_Email;
    this.TK_XacThuc = TaiKhoan.TK_XacThuc;
    this.TK_CreateDate = TaiKhoan.TK_CreateDate;
    this.TK_UpdateDate = TaiKhoan.TK_UpdateDate;
    this.TK_IsActive = TaiKhoan.TK_IsActive;
    this.TK_BlockedDate = TaiKhoan.TK_BlockDate;
}

// Danh sach tai khoan Nhan vien
TaiKhoan.getTaiKhoanEmployees = (result) => {
    dbConnect.query(
        `SELECT * FROM taikhoan WHERE LV_Id = 1 OR LV_Id = 2`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Fetching Successfully');
                result(null, res);
            }
        }
    );
}

// Danh sach tai khoan Giao vien
TaiKhoan.getTaiKhoanTeachers = (result) => {
    dbConnect.query(
        `SELECT * FROM taikhoan WHERE LV_Id = 3`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Fetching Successfully');
                result(null, res);
            }
        }
    );
}

// Danh sach tai khoan Hoc vien
TaiKhoan.getTaiKhoanStudents = (result) => {
    dbConnect.query(
        `SELECT * FROM taikhoan WHERE LV_Id = 4`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Fetching Successfully');
                result(null, res);
            }
        }
    );
}

// Get By TenDangNhap
TaiKhoan.getTaiKhoanByUsername = (username, result) => {
    dbConnect.query(
        `SELECT * FROM taikhoan WHERE TK_TenDangNhap = ${username}`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Fetching Successfully');
                result(null, res);
            }
        }
    );
}

// Create
TaiKhoan.addTaiKhoan = (TaiKhoanReqData, result) => {
    dbConnect.query(
        `INSERT INTO taikhoan SET ?`,
        TaiKhoanReqData,
        (err, res) => {
            if (err) {
                console.log('Error While Creating New Data', err);
                result(null, err);
            }
            else {
                console.log('Data Created Successfully');
                result(null, res);
            }
        }
    );
}

// Update
TaiKhoan.updateTaiKhoan = (username, TaiKhoanReqData, result) => {
    dbConnect.query(
        `
        UPDATE taikhoan
        SET
            TK_MatKhau = ?,
            TK_HoTen = ?,
            TK_GioiTinh = ?,
            TK_SinhNhat = ?,
            TK_Cmnd =?,
            TK_DiaChi = ?,
            TK_Sdt = ?,
            TK_Email = ?,
            TK_UpdateDate = CURRENT_TIMESTAMP()
        WHERE TK_TenDangNhap = ?`,
        [
            TaiKhoanReqData.TK_MatKhau,
            TaiKhoanReqData.TK_HoTen,
            TaiKhoanReqData.TK_GioiTinh,
            TaiKhoanReqData.TK_SinhNhat,
            TaiKhoanReqData.TK_Cmnd,
            TaiKhoanReqData.TK_DiaChi,
            TaiKhoanReqData.TK_Sdt,
            TaiKhoanReqData.TK_Email,
            username
        ],
        (err, res) => {
            if (err) {
                console.log('Error While Updating Data');
                result(err, null);
            } else {
                console.log('Data Updated Successfully!');
                result(null, res);
            }
        }
    );
}

// Reset password
TaiKhoan.resetPassword = (username, password, result) => {
    dbConnect.query(
        `UPDATE taikhoan SET TK_MatKhau = ? WHERE TK_TenDangNhap = ?`,
        [
            password,
            username,
        ],
        (err, res) => {
            if (err) {
                console.log('Error While Updating Data');
                result(err, null);
            } else {
                console.log('Data Updated Successfully!');
                result(null, res);
            }
        }
    );
}

// Blocked 
TaiKhoan.blockedTaiKhoan = (username, result) => {
    dbConnect.query(
        `UPDATE taikhoan SET TK_IsActive = 0 AND TK_BlockedDate = CURRENT_TIMESTAMP() WHERE TK_TenDangNhap = ${username}`,
        (err, res) => {
            if (err) {
                console.log('Error While Blocked Data');
                result(err, null);
            } else {
                console.log('Blocked Successfully!');
                result(null, res)
            }
        }
    );
}

// Active
TaiKhoan.activeTaiKhoan = (username, result) => {
    dbConnect.query(
        `UPDATE taikhoan SET TK_IsActive = 1 WHERE TK_TenDangNhap = ${username}`,
        (err, res) => {
            if (err) {
                console.log('Error While Activing Data');
                result(err, null);
            } else {
                console.log('Actived Successfully!');
                result(null, res)
            }
        }
    );
}

// Login
TaiKhoan.login = (username, password, result) => {
    dbConnect.query(
        `SELECT * FROM taikhoan WHERE TK_TenDangNhap = ? AND TK_MatKhau = ?`,
        [
            username,
            password
        ],
        (err, res) => {
            if (err) {
                console.log('Error While Fetching Data');
                result(err, null);
            } else {
                console.log('Fetching Successfully!');
                result(null, res)
            }
        }
    );
}



module.exports = TaiKhoan;