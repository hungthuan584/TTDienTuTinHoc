const LopHocModel = require('../models/LopHoc.model');

exports.getAll = (req, res) => {

    LopHocModel.getAll(
        (err, LopHoc) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(LopHoc);
        }
    );
}

exports.getById = (req, res) => {
    LopHocModel.getById(
        req.params.id,
        (err, LopHoc) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(LopHoc);
        }
    );
}

exports.addNew = (req, res) => {

    const data = new LopHocModel(req.body);
    data.LH_UpdateDate = '-  -     :  :';
    data.LH_IsDelete = 0;
    data.LH_DeleteDate = '-  -     :  :';

    LopHocModel.countNumber(
        data.LDT_Id,
        (err, LopHoc) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                var d = 0;
                if (LopHoc) {
                    d = LopHoc.length;
                }

                var id = data.LDT_Id + (d + 1).toString();

                data.LH_Id = id;

                if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
                    return req.send(400).send({ status: 0, message: 'Please fill all fields' });
                }
                else {
                    LopHocModel.addNew(
                        data,
                        (err) => {
                            if (err) {
                                return res.json({ status: 0, message: err });
                            }
                            return res.json('Create successfully!');
                        }
                    );
                }
            }
        }
    );
}

exports.updateById = (req, res) => {

    const data = new LopHocModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        LopHocModel.updateById(
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
    LopHocModel.deleteById(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Deleted Successfully' });
        }
    );
}