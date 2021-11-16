const PhanQuyenModel = require('../models/PhanQuyen.model');

exports.checkPermission = (req, res) => {
    PhanQuyenModel.checkPermission(
        req.params.username,
        req.params.functionId,
        (err, PhanQuyen) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            if (!PhanQuyen) {
                return res.status(500).json({ status: 0, message: 'None Permission' });
            } else {
                return res.json({ status: 1, data: PhanQuyen });
            }
        }
    );
}