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

// exports.getByGiaoVien = (req, res) => {
//     ThongBaoModel.getByGiaoVien(
//         req.params.GV_Id,
//         (err, ThongBao) => {
//             if (err) {
//                 return res.status(500).json({ status: 0, message: err });
//             }
//             return res.json(ThongBao);
//         }
//     );
// }

// exports.getByLopHoc = (req, res) => {
//     ThongBaoModel.getByLopHoc(
//         req.params.LH_Id,
//         (err, ThongBao) => {
//             if (err) {
//                 return res.status(500).json({ status: 0, message: err });
//             }
//             return res.json(ThongBao);
//         }
//     );
// }

exports.addNew = (req, res) => {

    const data = new ThongBaoModel.addNew(req.body);

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