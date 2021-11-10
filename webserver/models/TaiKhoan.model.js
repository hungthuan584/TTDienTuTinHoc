var dbConnect = require('../db.config');

var TaiKhoan = function (TaiKhoan) {
    this.TK_TenDangNhap = TaiKhoan.TK_TenDangNhap;
    this.TK_MatKhau = TaiKhoan.TK_MatKhau;
    this.Q_Id = TaiKhoan.Q_Id;
    this.TK_XacThuc = TaiKhoan.TK_XacThuc;
    this.TK_IsActive = TaiKhoan.TK_IsActive;
    this.TK_CreateDate = new Date();
    this.TK_UpdateDate = new Date();
    this.TK_DeactivateDate = new Date();
}

TaiKhoan.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM TaiKhoan`,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            }
            else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

// Get By TenDangNhap
TaiKhoan.getByUsername = (username, result) => {
    dbConnect.query(
        `SELECT * FROM taikhoan WHERE TK_TenDangNhap = ?`,
        username,
        (err, res) => {
            if (err) {
                console.log('Error while selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected successfully');
                result(null, res[0]);
            }
        }
    );
}

// Create
TaiKhoan.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO taikhoan SET ?`,
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

TaiKhoan.updatePassword = (username, password, result) => {
    dbConnect.query(
        `
        UPDATE taikhoan
        SET
            TK_MatKhau = ?,
            TK_UpdateDate = CURRENT_TIMESTAMP()
        WHERE TK_TenDangNhap = ?`,
        [
            password,
            username
        ],
        (err, res) => {
            if (err) {
                console.log('Error while updating');
                result(err, null);
            } else {
                console.log('Updated successfully!');
                result(null, res);
            }
        }
    );
}

// Blocked 
TaiKhoan.blockedByUsername = (username, result) => {
    dbConnect.query(
        `UPDATE TaiKhoan  SET TK_IsActive = 0, TK_DeactivateDate = CURRENT_TIMESTAMP() WHERE TK_TenDangNhap = ?`,
        username,
        (err, res) => {
            if (err) {
                console.log('Error while blocking', err);
                result(err, null);
            } else {
                console.log('Blocked successfully!');
                result(null, res)
            }
        }
    );
}

// Acctive
TaiKhoan.activeByUsername = (username, result) => {
    dbConnect.query(
        `UPDATE TaiKhoan SET TK_IsActive = 1, TK_DeactivateDate = '    -  -     :  :  ' WHERE TK_TenDangNhap = ?`,
        username,
        (err, res) => {
            if (err) {
                console.log('Error while active', err);
                result(err, null);
            } else {
                console.log('Actived successfully!');
                result(null, res)
            }
        }
    );
}

module.exports = TaiKhoan;