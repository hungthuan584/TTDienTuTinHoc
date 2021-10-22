var dbConnect = require('../db.config');

var TaiKhoan = function (TaiKhoan) {
    this.TK_TenDangNhap = TaiKhoan.TK_TenDangNhap;
    this.TK_MatKhau = TaiKhoan.TK_MatKhau;
    this.LV_Id = TaiKhoan.LV_Id;
    this.TK_XacThuc = TaiKhoan.TK_XacThuc;
    this.TK_CreateDate = new Date();
    this.TK_UpdateDate = new Date();
    this.TK_IsActive = TaiKhoan.TK_IsActive;
    this.TK_BlockedDate = new Date();
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
        `SELECT * FROM taikhoan WHERE TK_TenDangNhap = ?`, username,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Fetching Successfully');
                result(null, res[0]);
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

// Change password
TaiKhoan.updateTaiKhoan = (username, TaiKhoanReqData, result) => {
    dbConnect.query(
        `
        UPDATE taikhoan
        SET
            TK_MatKhau = ?,
            TK_UpdateDate = CURRENT_TIMESTAMP()
        WHERE TK_TenDangNhap = ?`,
        [
            TaiKhoanReqData.TK_MatKhau,
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


module.exports = TaiKhoan;