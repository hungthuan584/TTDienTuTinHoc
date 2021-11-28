const PhanQuyenModel = require('../models/PhanQuyen.model');

exports.getByUsername = (req, res) => {
    PhanQuyenModel.getByUsername(
        req.params.username,
        (err, PhanQuyen) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json(PhanQuyen);
            }
        }
    );
}

exports.addNew = (req, res) => {
    var errNumber = 0;
    const reqData = req.body;

    for (var i = 0; i < reqData.length; i++) {
        var PhanQuyenReqData = new PhanQuyenModel(req.body);
        PhanQuyenReqData = reqData[i];

        if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
            return res.status(500).json({ status: 0, message: 'Please fill all fields' });
        } else {
            PhanQuyenModel.addNew(
                PhanQuyenReqData,
                (err) => {
                    if (err) {
                        errNumber++;
                    }
                }
            );
        }
    }

    if (errNumber == 0) {
        return res.json({ status: 1, message: 'Added successfully' });
    } else {
        return res.status(500).json({ status: 0, message: 'Error while adding' });
    }
}

exports.deleteByUsername = (req, res) => {

    const PhanQuyenReqData = new PhanQuyenModel(req.body);
    PhanQuyenModel.deleteByUsername(
        req.params.username,
        req.params.id,
        (err) => {
            if (err) {
                res.status(500).json({ status: 0, message: err });
            } else {
                res.json({ status: 1, message: 'Deleted successfully' });
            }
        }
    );
}