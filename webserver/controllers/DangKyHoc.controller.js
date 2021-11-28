const DangKyHocModel = require('../models/DangKyHoc.model');

exports.getByLopHoc = (req, res) => {
    DangKyHocModel.getByLopHoc(
        req.params.id,
        (err, HocVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, siso: HocVien.length, data: HocVien });
            }
        }
    );
}

exports.checkUnique = (req, res) => {
    DangKyHocModel.checkUnique(
        req.params.lh_id,
        req.params.hv_id,
        (err, result) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                if (!result) {
                    return res.json({ status: 1, message: 'Ok' });
                } else {
                    return res.json({ status: 0, message: 'Đang học lớp này' });
                }
            }
        }
    );
}

exports.getByHocVien = (req, res) => {
    DangKyHocModel.getByHocVien(
        req.params.hv_id,
        (err, LopHoc) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json(LopHoc);
            }
        }
    );
}

exports.addNew = (req, res) => {
    const DangKyReqData = new DangKyHocModel(req.body);
    DangKyHocModel.addNew(
        DangKyReqData,
        (err) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Added successfully' });
            }
        }
    );
}

exports.deleteByStudent = (req, res) => {
    DangKyHocModel.deleteByStudent(
        req.params.id,
        (err) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Deleted successfully' });
            }
        }
    )
}