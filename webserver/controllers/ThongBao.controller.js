const ThongBaoModel = require('../models/ThongBao.model');

exports.getAll = (req, res) => {
    ThongBaoModel.getAll(
        (err, ThongBao) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(ThongBao);
        }
    );
}

exports.getById = (req, res) => {
    ThongBaoModel.getById(
        req.params.id,
        (err, ThongBao) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(ThongBao);
        }
    );
}

exports.addNew = (req, res) => {
    
    ThongBaoModel.conutNumber(
        (err, result) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                h = false;
                var d = 0;
                var id = 'TB';
                var year = new Date().getFullYear().toString().slice(2, 4);
                id += year;
                if (result) {
                    d = result.length;
                }

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
                    const data = new ThongBaoModel(req.body);

                    data.TB_Id = id;
                    data.TB_IsDelete = 0;
                    data.TB_UpdateDate = '-  -     :  :';
                    data.TB_DeleteDate = '-  -     :  :';

                    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
                        return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
                    }
                    else {
                        ThongBaoModel.addPhongHoc(
                            data,
                            (err, PhongHoc) => {
                                if (err) {
                                    return res.json({ status: 0, massage: err });
                                }
                                return res.json(PhongHoc);
                            }
                        );
                    }
                }
            }
        }
    );
}

exports.updateById = (req, res) => {

    const data = new ThongBaoModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        ThongBaoModel.updateById(
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
    ThongBaoModel.deleteById(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Deleted Successfully' });
        }
    );
}