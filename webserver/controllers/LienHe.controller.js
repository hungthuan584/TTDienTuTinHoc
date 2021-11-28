const LienHeModel = require('../models/LienHe.model');

exports.getAll = (req, res) => {
    LienHeModel.getAll(
        (err, LienHe) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json(LienHe);
            }
        }
    );
}

exports.addNew = (req, res) => {
    const LienHeReqData = new LienHeModel(req.body);
    LienHeReqData.CT_IsRead = 0;
    LienHeModel.addNew(
        LienHeReqData,
        (err) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Created successfully' });
            }
        }
    );
}

exports.isRead = (req, res) => {
    LienHeModel.isRead(
        req.params.id,
        (err) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Read successfully' });
            }
        }
    );
}

exports.readAll = (req, res) => {
    LienHeModel.readAll(
        (err) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Mark all successfully' });
            }
        }
    );
}