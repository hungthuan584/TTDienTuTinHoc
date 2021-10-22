const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const TaiKhoanModel = require('../models/TaiKhoan.model');
const { sign } = require('jsonwebtoken');
const crypto = require('crypto');

// Danh sach tai khoan nhan vien
exports.getTaiKhoanEmployees = (req, res) => {

    TaiKhoanModel.getTaiKhoanEmployees((err, TaiKhoan) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(TaiKhoan);
    });
}

// Danh sach tai khoan giao vien
exports.getTaiKhoanTeachers = (req, res) => {

    TaiKhoanModel.getTaiKhoanTeachers((err, TaiKhoan) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(TaiKhoan);
    });
}

// Danh sach tai khoan hoc vien
exports.getTaiKhoanStudents = (req, res) => {

    TaiKhoanModel.getTaiKhoanStudents((err, TaiKhoan) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(TaiKhoan);
    });
}

// Get by username
exports.getTaiKhoanByUsername = (req, res) => {
    TaiKhoanModel.getTaiKhoanByUsername(req.params.TK_TenDangNhap, (err, TaiKhoan) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(TaiKhoan);
    });
}

// Create by register
exports.addTaiKhoanByRegister = (req, res) => {
    const TaiKhoanReqData = new TaiKhoanModel(req.body);

    TaiKhoanReqData.TK_XacThuc = 0;
    TaiKhoanReqData.LV_Id = 4;
    TaiKhoanReqData.TK_IsActive = 1;
    TaiKhoanReqData.TK_UpdateDate = '-  -     :  :';
    TaiKhoanReqData.TK_BlockedDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
    }
    else {

        var salt = genSaltSync(10);
        TaiKhoanReqData.TK_MatKhau = '12345';
        TaiKhoanReqData.TK_MatKhau = hashSync(TaiKhoanReqData.TK_MatKhau, salt);

        TaiKhoanModel.addTaiKhoan(TaiKhoanReqData, (err, TaiKhoan) => {
            if (err) {
                return res.json({ status: 0, massage: err });
            }
            return res.json({ status: 1, massage: 'Created Successfully', data: TaiKhoan });
        });
    }
}

// Create by manager
exports.addTaiKhoanByManager = (req, res) => {
    const TaiKhoanReqData = new TaiKhoanModel(req.body);

    TaiKhoanReqData.TK_IsActive = 1;
    TaiKhoanReqData.TK_UpdateDate = '-  -     :  :';
    TaiKhoanReqData.TK_BlockedDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
    }
    else {
        var salt = genSaltSync(10);
        TaiKhoanReqData.TK_MatKhau = '12345';
        TaiKhoanReqData.TK_MatKhau = hashSync(TaiKhoanReqData.TK_MatKhau, salt);

        TaiKhoanModel.addTaiKhoan(TaiKhoanReqData, (err, TaiKhoan) => {
            if (err) {
                return res.json({ status: 0, massage: err });
            }
            return res.json(TaiKhoan);
        });
    }
}

// Update
exports.updateTaiKhoan = (req, res) => {
    const TaiKhoanReqData = new TaiKhoanModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
    }
    else {
        TaiKhoanModel.updateTaiKhoan(req.params.TK_TenDangNhap, TaiKhoanReqData, (err, TaiKhoan) => {
            if (err) {
                return res.json({ status: 0, massage: err });
            }
            return res.json({ status: 1, massage: 'Updated Successfully', data: TaiKhoan });
        });
    }
}

// Reset password
exports.resetPassword = (req, res) => {
    var salt = genSaltSync(10);
    password = hashSync('12345', salt);
    TaiKhoanModel.resetPassword(req.params.TK_TenDangNhap, password, (err) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Password Reseted Successfully!' });
    });
}

// Blocked
exports.blockedTaiKhoan = (req, res) => {
    TaiKhoanModel.blockedTaiKhoan(req.params.TK_TenDangNhap, (err, TaiKhoan) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Blocked Successfully!' });
    });
}

// Active
exports.activeTaiKhoan = (req, res) => {
    TaiKhoanModel.activeTaiKhoan(req.params.TK_TenDangNhap, (err, TaiKhoan) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Blocked Successfully!' });
    });
}

// Login
exports.login = (req, res) => {
    TaiKhoanModel.getTaiKhoanByUsername(req.body.TK_TenDangNhap, (err, TaiKhoan) => {
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

            return res.json({ status: 0, message: 'Invalid username or password' });
        }
    });
}