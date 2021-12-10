const DangKyThiModel = require('../models/DangKyThi.model');

exports.getAll = (req, res) => {
    DangKyThiModel.getAll(
        (err, DangKyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(DangKyThi);
            }
        }
    );
}

exports.getByHocVien = (req, res) => {
    DangKyThiModel.getByHocVien(
        req.params.hvId,
        (err, DangKyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(DangKyThi);
            }
        }
    );
}

exports.getByKyThi = (req, res) => {
    DangKyThiModel.getByKyThi(
        req.params.ktId,
        (err, DangKyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(DangKyThi);
            }
        }
    );
}

exports.addNew = (req, res) => {
    const DangKyThiReqData = new DangKyThiModel(req.body);
    DangKyThiModel.addNew(
        DangKyThiReqData,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Created successfully' });
            }
        }
    );
}

exports.deleteByHV = (req, res) => {
    DangKyThiModel.deleteByHV(
        req.params.hvId,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Deleted successfully' });
            }
        }
    );
}