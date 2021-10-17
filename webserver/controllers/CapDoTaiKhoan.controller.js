const CapDoTaiKhoanModel = require('../models/CapDoTaiKhoan.model');

// Get All
exports.getAllCapDo = (req, res)=>{
    CapDoTaiKhoanModel.getAllCapDo((err, CapDoTaiKhoan) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json({ status: 1, massage: 'Selected Data Successfully!', data: CapDoTaiKhoan });
    });
}