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

exports.getById = (req, res) => {
    ChungChiModel.getById(
        req.params.id,
        (err, ChungChi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(ChungChi);
            }
        }
    );
}

exports.addNew = (req, res) => {
    const ChungChiReqData = new ChungChiModel(req.body);
    ChungChiModel.addNew(
        ChungChiReqData,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Created successfully' });
            }
        }
    );
}

exports.getById = (req, res) => {
    ChungChiModel.getById(
        req.params.id,
        (err, ChungChi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(ChungChi);
            }
        }
    );
}