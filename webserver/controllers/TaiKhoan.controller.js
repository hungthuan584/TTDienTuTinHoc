const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const TaiKhoanModel = require('../models/TaiKhoan.model');
const { sign } = require('jsonwebtoken');
const crypto = require('crypto');

exports.getAllEmployee = (req, res) => {

    TaiKhoanModel.getAllEmployee(
        (err, TaiKhoan) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(TaiKhoan);
        }
    );
}

exports.getAllTeacher = (req, res) => {

    TaiKhoanModel.getAllTeacher(
        (err, TaiKhoan) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(TaiKhoan);
        }
    );
}

exports.getAllStudent = (req, res) => {

    TaiKhoanModel.getAllStudent(
        (err, TaiKhoan) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(TaiKhoan);
        }
    );
}


exports.getByUsername = (req, res) => {
    TaiKhoanModel.getByUsername(
        req.params.TK_TenDangNhap,
        (err, TaiKhoan) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(TaiKhoan);
        }
    );
}

// Create by register
exports.addByRegister = (req, res) => {

    const data = new TaiKhoanModel(req.body);

    data.TK_XacThuc = 0;
    data.LV_Id = 4;
    data.TK_IsActive = 1;
    data.TK_UpdateDate = '-  -     :  :';
    data.TK_BlockedDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    }
    else {
        var salt = genSaltSync(10);
        data.TK_MatKhau = '$tudentCit';
        data.TK_MatKhau = hashSync(data.TK_MatKhau, salt);

        TaiKhoanModel.addNew(
            data,
            (err, TaiKhoan) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                return res.json(TaiKhoan);
            }
        );
    }
}

exports.addByManager = (req, res) => {

    const data = new TaiKhoanModel(req.body);

    data.TK_IsActive = 1;
    data.TK_UpdateDate = '-  -     :  :';
    data.TK_BlockedDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    }
    else {
        var salt = genSaltSync(10);
        data.TK_MatKhau = 'User@Cit';
        data.TK_MatKhau = hashSync(data.TK_MatKhau, salt);

        TaiKhoanModel.addNew(
            data,
            (err, TaiKhoan) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                return res.json(TaiKhoan);
            }
        );
    }
}

exports.changePassword = (req, res) => {

    const data = new TaiKhoanModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    }
    else {
        TaiKhoanModel.updatePassword(
            req.params.TK_TenDangNhap,
            data,
            (err) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                return res.json({ status: 1, message: 'Change password successfully' });
            }
        );
    }
}

// Reset password
exports.resetPassword = (req, res) => {

    const data = TaiKhoanModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {

        var year = new Date().getFullYear();
        var defaultPassword = 'Cit@' + year.toString();

        var salt = genSaltSync(10);
        data.TK_MatKhau = hashSync(defaultPassword, salt);

        TaiKhoanModel.changePassword(
            req.params.TK_TenDangNhap,
            data,
            (err) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                res.json({ status: 1, message: 'Reset password successfully!' });
            }
        );
    }


}

// Blocked
exports.blockedByUsername = (req, res) => {
    TaiKhoanModel.blockedByUsername(
        req.params.TK_TenDangNhap,
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
        req.params.TK_TenDangNhap,
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
                return res.json({ status: 0, message: 'Faild to login' });
            }


            const result = compareSync(req.body.TK_MatKhau, TaiKhoan.TK_MatKhau);
            if (result) {
                
                TaiKhoan.TK_MatKhau = undefined;
                const jsonToken = sign({ result: TaiKhoan }, 'qwe1234', {
                    expiresIn: "4h"
                });

                return res.json({ status: 1, message: 'Login Successfully', token: jsonToken });
            } else {

                return res.json({ status: 0, message: 'Invalid username or password', login: 0 });
            }
        }
    );
}