const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const TaiKhoanModel = require('../models/TaiKhoan.model');
const { sign } = require('jsonwebtoken');

exports.getAll = (req, res) => {
    TaiKhoanModel.getAll(
        (err, TaiKhoan) => {
            if (err) {
                res.status(500).json({ status: 0, message: err });
            }
            return res.json(TaiKhoan);
        }
    );
}

exports.getByUsername = (req, res) => {
    TaiKhoanModel.getByUsername(
        req.params.username,
        (err, TaiKhoan) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(TaiKhoan);
        }
    );
}

exports.changePassword = (req, res) => {
    TaiKhoanModel.getByUsername(
        req.params.username,

        (err, TaiKhoan) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }

            var salt = genSaltSync(10);

            var oldPassword = req.body.TK_MatKhauCu;
            var newPassword = hashSync(req.body.TK_MatKhauMoi, salt);

            const result = compareSync(oldPassword, TaiKhoan.TK_MatKhau);

            console.log('Result: ', result);
            if (result) {
                TaiKhoan.TK_MatKhau = undefined;

                TaiKhoanModel.updatePassword(
                    req.params.username,
                    newPassword,
                    (err) => {
                        if (err) {
                            return res.status(500).json({ status: 0, message: err });
                        }
                        return res.json({ status: 1, message: 'Change successfully' });
                    }
                );
            } else {
                return res.json({ status: 0, message: 'Error while changing' });
            }
        }
    );
}

// Reset password
exports.resetPassword = (req, res) => {

    var year = new Date().getFullYear();
    var defaultPassword = 'Cit@' + year.toString();

    var salt = genSaltSync(10);
    var password = hashSync(defaultPassword, salt);

    TaiKhoanModel.updatePassword(
        req.params.username,
        password,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'Reset password successfully!' });
        }
    );
}

// Blocked
exports.blockedByUsername = (req, res) => {
    TaiKhoanModel.blockedByUsername(
        req.params.username,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'Blocked Successfully!' });
        }
    );
}

// Active
exports.activeByUsername = (req, res) => {
    TaiKhoanModel.activeByUsername(
        req.params.username,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            res.json({ status: 1, message: 'Actived Successfully!' });
        }
    );
}

// Login
exports.login = (req, res) => {
    TaiKhoanModel.getByUsername(
        req.body.TK_TenDangNhap,
        (err, TaiKhoan) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            if (!TaiKhoan) {
                return res.json({ status: 0, message: 'Sai tên tài khoản hoặc mật khẩu' });
            }

            const result = compareSync(req.body.TK_MatKhau, TaiKhoan.TK_MatKhau);
            if (result) {

                TaiKhoan.TK_MatKhau = undefined;
                const jsonToken = sign({ result: TaiKhoan }, 'qwe1234', {
                    expiresIn: "1h"
                });

                return res.json({ status: 1, message: 'Đăng nhập thành công', token: jsonToken });
            } else {

                return res.json({ status: 0, message: 'Sai tên tài khoản hoặc mật khẩu', login: 0 });
            }
        }
    );
}