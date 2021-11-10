const QuyenModel = require('../models/Quyen.model');

// Get All
exports.getAll = (req, res)=>{
    QuyenModel.getAll((err, Quyen) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json(Quyen);
    });
}