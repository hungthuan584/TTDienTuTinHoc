const ThoiGianHoc = require('../models/ThoiGianHoc.model');

exports.getAll = (req, res) => {
    ThoiGianHoc.getAll(
        (err, ThoiGian) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(ThoiGian);
            }
        }
    );
}