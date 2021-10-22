const LopHocModel = require('../models/LopHoc.model');

// Danh sach lop dao tao
exports.getAllLopHoc = (req, res) => {

    LopHocModel.getAllLopHoc((err, LopHoc) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(LopHoc);
    });
}

// Get lop dao tao by Id
exports.getLopHocById = (req, res) => {

    LopHocModel.getLopHocById(req.params.LH_Id, (err, LopHoc) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(LopHoc);
    });
}

// Them lop dao tao
exports.addLopHoc = (req, res) => {

    const LopHocReqData = new LopHocModel(req.body);

    LopHocReqData.LH_UpdateDate = '-  -     :  :';
    LopHocReqData.LH_IsDelete = 0;
    LopHocReqData.LH_DeleteDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
    }
    else {
        LopHocModel.addLopHoc(LopHocReqData, (err, LopHoc) => {
            if (err) {
                return res.json({ status: 0, massage: err });
            }
            return res.json(LopHoc);
        });
    }
}

exports.updateLopHoc = (req, res) => {

    const LopHocReqData = new LopHocModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, massage: 'Please fill all fields' });
    } else {
        LopHocModel.updateLopHoc(req.params.LH_Id, LopHocReqData, (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Updated Successfully' });
        });
    }
}

exports.deleteLopHoc = (req, res) => {

    LopHocModel.deleteLopHoc(req.params.LH_Id, (err) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Deleted Successfully' });
    });
}