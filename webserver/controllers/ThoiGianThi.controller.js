const ThoiGianThiModel = require('../models/ThoiGianThi.model');

exports.getAll = (req, res) => {
    ThoiGianThiModel.getAll(
        (err, ThoiGianThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(ThoiGianThi);
            }
        }
    );
}