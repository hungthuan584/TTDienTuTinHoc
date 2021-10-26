const NhanVienModel = require('../models/NhanVien.model');

const NhanVienModel = require('../models/NhanVien.model');

exports.getAll = (req, res) => {
    NhanVienModel.getAll(
        (err, NhanVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(NhanVien);
        }
    );
}

exports.getById = (req, res) => {
    NhanVienModel.getById(
        req.params.id,
        (err, NhanVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(NhanVien);
        }
    );
}

exports.addNew = (req, res) => {

    const data = new NhanVienModel.addNew(req.body);

    data.NV_IsDelete = 0;
    data.NV_UpdateDate = '-  -     :  :';
    data.NV_DeleteDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
    }
    else {
        NhanVienModel.addNew(
            data,
            (err, NhanVien) => {
                if (err) {
                    return res.json({ status: 0, massage: err });
                }
                return res.json(NhanVien);
            }
        );
    }
}

exports.updateById = (req, res) => {

    const data = new NhanVienModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        NhanVienModel.updateById(
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
    NhanVienModel.deleteById(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Deleted Successfully' });
        }
    );
}