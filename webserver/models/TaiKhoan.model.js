var dbConnect = require('../db.config');

var TaiKhoan = function (TaiKhoan) {
    this.TK_TenDangNhap = TaiKhoan.TK_TenDangNhap;
    this.TK_MatKhau = TaiKhoan.TK_MatKhau;
    this.Q_Id = TaiKhoan.Q_Id;
    this.TK_XacThuc = TaiKhoan.TK_XacThuc;
    this.TK_NumberOfLogin = TaiKhoan.TK_NumberOfLogin;
    this.TK_AnhDaiDien = TaiKhoan.TK_AnhDaiDien;
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

TaiKhoan.countNumber = (result) => {
    dbConnect.query(
        `SELECT * FROM TaiKhoan WHERE Q_Id != 4`,
        (err, res) => {
            if (err) {
                console.log('Error counting', err);
                result(null, err);
            }
            else {
                console.log('Counted successfully');
                result(null, res);
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
                result(null, err);
            } else {
                console.log('Updated successfully!');
                result(null, res);
            }
        }
    );
}

TaiKhoan.changeRole = (username, qId, result) => {
    dbConnect.query(
        `UPDATE TaiKhoan SET Q_Id = ? WHERE TK_TenDangNhap = ?`,
        [
            qId,
            username
        ],
        (err, res) => {
            if (err) {
                console.log('Error while changing');
                result(null, err);
            } else {
                console.log('Changed successfully!');
                result(null, res);
            }
        }
    );
}

TaiKhoan.changeAvatar = (username, data, result) => {
    dbConnect.query(
        `UPDATE TaiKhoan SET TK_AnhDaiDien = ?, TK_UpdateDate = CURRENT_TIMESTAMP() WHERE TK_TenDangNhap = ?`,
        [data, username],
        (err, res) => {
            if (err) {
                console.log('Error while changing');
                result(null, err);
            } else {
                console.log('Changed successfully!');
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
                result(null, err);
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
                result(null, err);
            } else {
                console.log('Actived successfully!');
                result(null, res);
            }
        }
    );
}

TaiKhoan.countLogin = (username, result) => {
    dbConnect.query(
        `UPDATE taikhoan
        SET TK_NumberOfLogin = (SELECT TK_NumberOfLogin FROM taikhoan WHERE TK_TenDangNhap = ?)+1
        WHERE TK_TenDangNhap = ?`,
        [
            username, username
        ],
        (err, res) => {
            if (err) {
                console.log('Error while active', err);
                result(null, err);
            } else {
                console.log('Actived successfully!');
                result(null, res);
            }
        }
    );
}

module.exports = TaiKhoan;