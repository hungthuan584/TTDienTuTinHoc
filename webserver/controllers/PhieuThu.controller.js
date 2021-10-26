const PhieuThuModel = require('../models/PhieuThu.model');

exports.getAll = (req, res) => {
    PhieuThuModel.getAll(
        (err, PhieuThu) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(PhieuThu);
        }
    );
}

exports.getById = (req, res) => {
    PhieuThuModel.getById(
        req.params.id,
        (err, PhieuThu) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(PhieuThu);
        }
    );
}

exports.addByRegister = (req, res) => {

    const data = new PhieuThuModel.addNew(req.body);

    data.PT_IsComplete = 0;
    data.PT_CompleteDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
    }
    else {
        PhieuThuModel.addNew(
            data,
            (err, PhieuThu) => {
                if (err) {
                    return res.json({ status: 0, massage: err });
                }
                return res.json(PhieuThu);
            }
        );
    }
}

exports.updateById = (req, res) => {

    const data = new PhieuThuModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        PhieuThuModel.updateById(
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

exports.confirmComplete = (req, res) => {
    PhieuThuModel.confirmComplete(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Confirm Successfully' });
        }
    );
}