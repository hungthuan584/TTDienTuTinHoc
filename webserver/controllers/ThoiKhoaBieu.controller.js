const ThoiKhoaBieuModel = require('../models/ThoiKhoaBieu.model');

exports.getAll = (req, res) => {
    ThoiKhoaBieuModel.getAll(
        (err, ThoiKhoaBieu) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(ThoiKhoaBieu);
        }
    );
}

exports.getById = (req, res) => {
    ThoiKhoaBieuModel.getById(
        req.params.id,
        (err, ThoiKhoaBieu) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(ThoiKhoaBieu);
        }
    );
}

// exports.getByLopHoc = (req, res) => {
//     ThoiKhoaBieuModel.getByLopHoc(
//         req.params.LH_Id,
//         (err, ThoiKhoaBieu) => {
//             if (err) {
//                 return res.status(500).json({ status: 0, message: err });
//             }
//             return res.json(ThoiKhoaBieu);
//         }
//     );
// }

exports.addNew = (req, res) => {

    const data = new ThoiKhoaBieuModel.addNew(req.body);

    data.TKB_IsDelete = 0;
    data.TKB_UpdateDate = '-  -     :  :';
    data.TKB_DeleteDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
    }
    else {
        ThoiKhoaBieuModel.addPhongHoc(
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

    const data = new ThoiKhoaBieuModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        ThoiKhoaBieuModel.updateById(
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
    ThoiKhoaBieuModel.deleteById(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Deleted Successfully' });
        }
    );
}