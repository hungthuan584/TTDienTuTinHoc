const ThongBaoModel = require('../models/ThongBao.model');

exports.getAll = (req, res) => {
    ThongBaoModel.getAll(
        (err, ThongBao) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json(ThongBao);
            }
        }
    );
}

exports.getById = (req, res) => {
    ThongBaoModel.getById(
        req.params.id,
        (err, ThongBao) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json(ThongBao);
            }
        }
    );
}

exports.getByLopHoc = (req, res) => {
    ThongBaoModel.getByLopHoc(
        req.params.id,
        (err, ThongBao) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json(ThongBao);
            }
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

                id += (d + 1).toString();
                
                const data = new ThongBaoModel(req.body);

                data.TB_Id = id;
                data.TB_IsDelete = 0;
                data.TB_UpdateDate = '-  -     :  :';

                if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
                    return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
                }
                else {
                    ThongBaoModel.addNew(
                        data,
                        (err) => {
                            if (err) {
                                return res.json({ status: 0, massage: err });
                            } else {
                                return res.json({ status: 1, message: 'Created successfully' });
                            }
                        }
                    );
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