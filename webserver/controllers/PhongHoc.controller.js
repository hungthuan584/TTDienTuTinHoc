const PhongHocModel = require('../models/PhongHoc.model');

// Get All
exports.getAllPhongHoc = (req, res) => {

    PhongHocModel.getAllPhongHoc((err, PhongHoc) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(PhongHoc);
    });
}

// Get By Id
exports.getPhongHocById = (req, res) => {
    PhongHocModel.getPhongHocById(req.params.PH_Id, (err, PhongHoc) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(PhongHoc);
    });
}

// Create
exports.addPhongHoc = (req, res) => {

    const PhongHocReqData = new PhongHocModel(req.body);

    PhongHocReqData.PH_IsDelete = 0;
    PhongHocReqData.PH_DeleteDate = '-  -     :  :';
    PhongHocReqData.PH_UpdateDate = '-  -     :  :';

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
    }
    else {
        PhongHocModel.addPhongHoc(PhongHocReqData, (err, PhongHoc) => {
            if (err) {
                return res.json({ status: 0, massage: err });
            }
            return res.json(PhongHoc);
        });
    }
}

// Update
exports.updatePhongHocById = (req, res) => {
    const PhongHocReqData = new PhongHocModel(req.body);
    // Check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, massage: 'Please fill all fields' });
    } else {
        PhongHocModel.updatePhongHocById(req.params.PH_Id, PhongHocReqData, (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Updated Successfully' });
        });
    }
}


// Delete
exports.deletePhongHocById = (req, res) => {
    PhongHocModel.deletePhongHocById(req.params.PH_Id, (err) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Deleted Successfully' });
    });
}