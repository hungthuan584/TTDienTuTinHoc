const ChucVuModel = require('../models/ChucVu.model');

exports.getAll = (req, res) => {
    ChucVuModel.getAll(
        (err, ChucVu) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                res.json(ChucVu);
            }
        }
    );
}