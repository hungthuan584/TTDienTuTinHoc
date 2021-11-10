const LopDaoTaoModel = require('../models/LopDaoTao.model');

// Danh sach lop dao tao
exports.getAll = (req, res) => {
    LopDaoTaoModel.getAll(
        (err, LopDaoTao) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(LopDaoTao);
        }
    );
}

// Get lop dao tao by Id
exports.getById = (req, res) => {
    LopDaoTaoModel.getById(
        req.params.id,
        (err, LopDaoTao) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(LopDaoTao);
        }
    );
}

// Them lop dao tao
exports.addLopDaoTao = (req, res) => {

    const data = new LopDaoTaoModel(req.body);

    data.LDT_UpdateDate = '-  -     :  :';
    data.LDT_IsDelete = 0;
    data.LDT_DeleteDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    }
    else {
        LopDaoTaoModel.addNew(
            data,
            (err, LopDaoTao) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                return res.json(LopDaoTao);
            }
        );
    }
}

exports.updateById = (req, res) => {

    const data = new LopDaoTaoModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        LopDaoTaoModel.updateById(
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
    LopDaoTaoModel.deleteById(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Deleted Successfully' });
        }
    );
}