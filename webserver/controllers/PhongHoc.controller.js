const PhongHocModel = require('../models/PhongHoc.model');

// Get All
exports.getAll = (req, res) => {
    PhongHocModel.getAll(
        (err, PhongHoc) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(PhongHoc);
        }
    );
}

exports.getPhongThi = (req, res) => {
    PhongHocModel.getPhongThi(
        req.params.ktId,
        (err, PhongHoc) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(PhongHoc);
            }
        }
    );
}

// Get By Id
exports.getById = (req, res) => {
    PhongHocModel.getById(
        req.params.id,
        (err, PhongHoc) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(PhongHoc);
        }
    );
}

// Create
exports.addNew = (req, res) => {

    PhongHocModel.countNumber(
        (err, PhongHoc) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }

            var h = false;
            var id = 'PTH';
            var d = 0;

            if (PhongHoc) {
                d = PhongHoc.length;
            }

            if (d < 10) {
                h = true;
                id += '0' + (d + 1).toString();
            } else {
                h = true;
                id += (d + 1).toString();
            }

            if (h == true) {

                const data = new PhongHocModel(req.body);

                data.PH_Id = id;
                data.PH_IsDelete = 0;
                data.PH_DeleteDate = '-  -     :  :';
                data.PH_UpdateDate = '-  -     :  :';

                if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
                    return req.send(400).send({ status: 0, message: 'Please fill all fields' });
                }
                else {
                    PhongHocModel.addNew(
                        data,
                        (err, PhongHoc) => {
                            if (err) {
                                return res.json({ status: 0, message: err });
                            }
                            return res.json(PhongHoc);
                        }
                    );
                }
            }
        }
    );
}

// Update
exports.updateById = (req, res) => {

    const data = new PhongHocModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        PhongHocModel.updateById(
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

// Delete
exports.deleteById = (req, res) => {
    PhongHocModel.deleteById(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Deleted Successfully' });
        }
    );
}