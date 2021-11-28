const ChucNangModel = require('../models/ChucNang.model');

exports.getAll = (req, res) => {
    ChucNangModel.getAll(
        (err, ChucNang) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json(ChucNang);
            }
        }
    );
}