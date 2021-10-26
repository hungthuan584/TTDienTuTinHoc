const UuDaiModel = require('../models/UuDai.model');

exports.getAll = (req, res) => {
    UuDaiModel.getAll(
        (err, UuDai) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(UuDai);
        }
    );
}

exports.getById = (req, res) => {
    UuDaiModel.getById(
        req.params.id,
        (err, UuDai) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(UuDai);
        }
    );
}

exports.addNew = (req, res) => {

    const data = new UuDaiModel.addNew(req.body);

    data.UD_IsDelete = 0;
    data.UD_UpdateDate = '-  -     :  :';
    data.UD_DeleteDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    }
    else {
        UuDaiModel.addNew(
            data,
            (err, UuDai) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                return res.json(UuDai);
            }
        );
    }
}

exports.updateById = (req, res) => {

    const data = new UuDaiModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        UuDaiModel.updateById(
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

exports.deleteById = (req, res) => {
    UuDaiModel.deleteById(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Deleted Successfully' });
        }
    );
}