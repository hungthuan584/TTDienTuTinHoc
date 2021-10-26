const KyThiModel = require('../models/KyThi.model');

exports.getAll = (req, res) => {
    KyThiModel.addNew(
        (err, KyThi) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(KyThi);
        }
    );
}

exports.getById = (req, res) => {
    KyThiModel.getById(
        req.params.id,
        (err, KyThi) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(KyThi);
        }
    );
}

exports.addNew = (req, res) => {

    const data = new KyThiModel(req.body);

    data.KT_UpdateDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        KyThiModel.addNew(
            data,
            (err, KyThi) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                return res.json(KyThi);
            }
        );
    }
}

exports.updateById = (req, res) => {
    const data = KyThiModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        KyThiModel.updateById(
            req.params.id,
            data,
            (err) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                return res.json({ status: 1, message: 'Updated Successfully' });
            }
        );
    }
}