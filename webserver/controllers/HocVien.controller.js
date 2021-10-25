const HocVienModel = require('../models/HocVien.model');


// Danh sach hoc vien
exports.getAllHocVien = (req, res) => {

    HocVienModel.getAllHocVien((err, HocVien) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(HocVien);
    });
}

// Get hoc vien by Id
exports.getHocVienById = (req, res) => {

    HocVienModel.getHocVienById(req.params.HV_Id, (err, HocVien) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(HocVien);
    });
}

// Danh sach hoc vien trong nam hien tai
exports.getHocVienByCreateYear = (req, res) => {

    HocVienModel.getHocVienByYear((err, HocVien) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(HocVien);
    });
}

// Them hoc vien
exports.addHocVien = (req, res) => {

    var listHocVienInYear = JSON.parse(this.getHocVienByCreateYear());

    const numberOfHocVien = listHocVienInYear.length;

    console.log(numberOfHocVien);

    // const HocVienReqData = new HocVienModel(req.body);

    // HocVienReqData.HV_AnhDaiDien = null;
    // HocVienReqData.HV_UpdateDate = '-  -     :  :';
    // HocVienReqData.HV_IsDelete = 0;
    // HocVienReqData.HV_DeleteDate = '-  -     :  :';

    // if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
    //     return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
    // }
    // else {
    //     HocVienModel.addHocVien(HocVienReqData, (err, HocVien) => {
    //         if (err) {
    //             return res.json({ status: 0, massage: err });
    //         }
    //         return res.json(HocVien);
    //     });
    // }
}

// Sua
exports.updateHocVien = (req, res) => {

    const HocVienReqData = new HocVienModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, massage: 'Please fill all fields' });
    } else {
        HocVienModel.updateHocVien(req.params.HV_Id, HocVienReqData, (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Updated Successfully' });
        });
    }
}

// Xoa
exports.deleteHocVien = (req, res) => {

    HocVienModel.deleteHocVien(req.params.HV_Id, (err) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Deleted Successfully' });
    });
}