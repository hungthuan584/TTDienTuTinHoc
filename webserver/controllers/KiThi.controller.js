const KyThiModel = require('../models/KiThi.model');

exports.getAll = (req, res) => {
    KyThiModel.getAll(
        (err, KyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(KyThi);
            }
        }
    );
}

exports.getById = (req, res) => {
    KyThiModel.getById(
        req.params.id,
        (err, KyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(KyThi);
            }
        }
    );
}

exports.getByChungChi = (req, res) => {
    KyThiModel.getByCC(
        req.params.ccId,
        (err, KyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(KyThi);
            }
        }
    );
}

exports.getByDotThi = (req, res) => {
    KyThiModel.getByDT(
        req.params.dtId,
        (err, KyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(KyThi);
            }
        }
    );
}

exports.addNew = (req, res) => {
    const KyThiReqData = new KyThiModel(req.body);
    KyThiModel.addNew(
        KyThiReqData,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Created successfully' });
            }
        }
    );
}

exports.updateById = (req, res) => {
    const KyThiReqData = new KyThiModel(req.body);
    KyThiModel.updateById(
        req.params.id,
        KyThiReqData,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Updated successfully' });
            }
        }
    );
}