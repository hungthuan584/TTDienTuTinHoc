const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const TaiKhoanModel = require('../models/TaiKhoan.model');
const PhanQuyenModel = require('../models/PhanQuyen.model');
const { sign } = require('jsonwebtoken');
const fs = require('fs');


exports.getAll = (req, res) => {
    TaiKhoanModel.getAll(
        (err, TaiKhoan) => {
            if (err) {
                res.status(500).json({ status: 0, message: err });
            } else {
                TaiKhoan.TK_MatKhau = undefined;
                return res.json(TaiKhoan);
            }
        }
    );
}

exports.getByUsername = (req, res) => {
    TaiKhoanModel.getByUsername(
        req.params.username,
        (err, TaiKhoan) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                TaiKhoan.TK_MatKhau = undefined;
                return res.json(TaiKhoan);
            }
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
    var defaultPassword = 'u$erCit@' + year.toString();

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
            res.json({ status: 1, message: '???? kho?? t??i kho???n' });
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
            res.json({ status: 1, message: 'M??? kho?? th??nh c??ng' });
        }
    );
}

// Login
exports.login = (req, res) => {
    TaiKhoanModel.getByUsername(
        req.body.TK_TenDangNhap,
        (err, TaiKhoan) => {
            if (err) {
                return res.json({ isLoggedIn: 0, message: err });
            }
            if (!TaiKhoan) {
                return res.json({ isLoggedIn: 0, message: 'T??i kho???n kh??ng t???n t???i' });
            } else {
                if (TaiKhoan.TK_IsActive != 1) {
                    return res.json({ isLoggedIn: 0, message: 'T??i kho???n kh??ng t???n t???i' });
                } else {
                    const result = compareSync(req.body.TK_MatKhau, TaiKhoan.TK_MatKhau);
                    if (result) {
                        TaiKhoan.TK_MatKhau = undefined;
                        const jsonToken = sign({ result: TaiKhoan }, 'qwe1234', {
                            expiresIn: "12h"
                        });

                        TaiKhoanModel.countLogin(req.body.TK_TenDangNhap, (err) => {
                            if (err) {
                                return res.json({ status: 0, message: err });
                            }
                        });

                        PhanQuyenModel.getByUsername(
                            TaiKhoan.TK_TenDangNhap,
                            (err) => {
                                if (err) {
                                    return res.status(500).json({ status: 0, message: err });
                                } else {
                                    return res.json({ isLoggedIn: 1, token: jsonToken, loginAccount: TaiKhoan });
                                }
                            }
                        );
                    } else {
                        return res.json({ isLoggedIn: 0, message: 'Sai t??n t??i kho???n ho???c m???t kh???u' });
                    }
                }
            }
        }
    );
}