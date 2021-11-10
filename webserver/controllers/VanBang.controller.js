const VanBangModel = require('../models/VanBang.model');

exports.getAll = (req, res) => {
    VanBangModel.getAll(
        (err, VanBang) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(VanBang);
        }
    );
}

exports.getById = (req, res) => {
    VanBangModel.getById(
        req.params.id,
        (err, VanBang) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(VanBang);
        }
    );
}

exports.addNew = (req, res) => {
    const data = new VanBangModel(req.body);

    data.VB_IsDelete = 0;
    data.VB_UpdateDate = '-  -     :  :';
    data.VB_DeleteDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(500).send({ status: 0, massage: 'Please fill all fields' });
    } else {
        VanBangModel.addNew(
            data,
            (err, VanBang) => {
                if (err) {
                    return res.status(500).json({ status: 0, message: err });
                }
                return res.json({ status: 1, message: 'Updated successfully!' });
            }
        );
    }
}

exports.updateById = (req, res) => {
    const data = new VanBangModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(500).send({ status: 0, message: 'Please fill all fields' });
    } else {
        VanBangModel.updateById(
            req.params.id,
            data,
            (err, VanBang) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                return res.json(VanBang);
            }
        );
    }
}

exports.deleteById = (req, res) => {
    VanBangModel.deleteById(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json(VanBang);
        }
    );
}