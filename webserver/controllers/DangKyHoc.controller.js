const DangKyHocModel = require('../models/DangKyHoc.model');

exports.getByLopHoc = (req, res) => {
    DangKyHocModel.getByLopHoc(
        req.params.id,
        (err, HocVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, siso: HocVien.length });
            }
        }
    );
}