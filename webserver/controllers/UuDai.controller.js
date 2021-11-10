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

    UuDaiModel.countNumber(
        (err, data) => {
            if (err) {
                return res.status(500).json({ status: 0, message: 'Please fill all fields' });
            } else {
                var d = 0;
                var id = 'UD';

                if (data) {
                    d = data.length;
                }

                var y = new Date().getFullYear().toString().slice(2, 4);
                id += y;
                var h = false;
                if (d < 9) {
                    h = true;
                    id += '00' + (d + 1).toString();
                } else {
                    if (d < 99) {
                        h = true;
                        id += '0' + (d + 1).toString();
                    } else {
                        if (d < 999) {
                            h = true;
                            id += (d + 1).toString();
                        }
                    }
                }
                if (h == true) {
                    const data = new UuDaiModel(req.body);

                    data.UD_Id = id;
                    data.UD_IsDelete = 0;
                    data.UD_UpdateDate = '-  -     :  :';
                    data.UD_DeleteDate = '-  -     :  :';

                    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
                        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
                    }
                    else {
                        UuDaiModel.addNew(
                            data,
                            (err) => {
                                if (err) {
                                    return res.json({ status: 0, message: err });
                                } else {
                                    return res.json({ status: 1, message: 'Created successfully' });
                                }
                            }
                        );
                    }
                }
            }
        }
    );
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