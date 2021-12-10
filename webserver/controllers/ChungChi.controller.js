const ChungChiModel = require('../models/ChungChi.model');

exports.getAll = (req, res) => {
    ChungChiModel.getAll(
        (err, ChungChi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(ChungChi);
            }
        }
    );
}