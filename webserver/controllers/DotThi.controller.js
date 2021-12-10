const DotThiModel = require('../models/DotThi.model');

exports.getAll = (req, res) => {
    DotThiModel.getAll(
        (err, DotThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(DotThi);
            }
        }
    );
}

exports.getCurrent = (req, res) => {
    DotThiModel.getCurrent(
        (err, DotThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(DotThi);
            }
        }
    );
}

exports.getById = (req, res) => {
    DotThiModel.getById(
        req.params.id,
        (err, DotThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(DotThi);
            }
        }
    );
}

exports.addNew = (req, res) => {
    const DotThiReqData = new DotThiModel(req.body);
    DotThiModel.addNew(
        DotThiReqData,
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
    const DotThiReqData = new DotThiModel(req.body);
    DotThiModel.updateById(
        req.params.id,
        DotThiReqData,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Updated successfully' });
            }
        }
    );
}

exports.completeById = (req, res) => {
    DotThiModel.completeById(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Completed successfully' });
            }
        }
    );
}

exports.lockRegister = (req, res) => {
    DotThiModel.lockRegister(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Locked successfully' });
            }
        }
    );
}