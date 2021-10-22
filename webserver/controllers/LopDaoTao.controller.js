const LopDaoTaoModel = require('../models/LopDaoTao.model');

// Danh sach lop dao tao
exports.getAllLopDaoTao = (req, res) => {

    LopDaoTaoModel.getAllLopDaoTao((err, LopDaoTao) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(LopDaoTao);
    });
}

// Get lop dao tao by Id
exports.getLopDaoTaoById = (req, res) => {

    LopDaoTaoModel.getLopDaoTaoById(req.params.LDT_Id, (err, LopDaoTao) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(LopDaoTao);
    });
}

// Them lop dao tao
exports.addLopDaoTao = (req, res) => {

    const LopDaoTaoReqData = new LopDaoTaoModel(req.body);

    LopDaoTaoReqData.LDT_UpdateDate = '-  -     :  :';
    LopDaoTaoReqData.LDT_IsDelete = 0;
    LopDaoTaoReqData.LDT_DeleteDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
    }
    else {
        LopDaoTaoModel.addLopDaoTao(LopDaoTaoReqData, (err, LopDaoTao) => {
            if (err) {
                return res.json({ status: 0, massage: err });
            }
            return res.json(LopDaoTao);
        });
    }
}

exports.updateLopDaoTao = (req, res) => {

    const LopDaoTaoReqData = new LopDaoTaoModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, massage: 'Please fill all fields' });
    } else {
        LopDaoTaoModel.updateLopDaoTao(req.params.LDT_Id, LopDaoTaoReqData, (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Updated Successfully' });
        });
    }
}

exports.deleteLopDaoTao = (req, res) => {

    LopDaoTaoModel.deleteLopDaoTao(req.params.LDT_Id, (err) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Deleted Successfully' });
    });
}