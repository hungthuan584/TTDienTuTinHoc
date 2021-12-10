const HeThongModel = require('../models/HeThong.model');

exports.getInfo = (req, res) => {
    HeThongModel.getInfo(
        (err, HeThong) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(HeThong);
            }
        }
    );
}

exports.getConfig = (req, res) => {
    HeThongModel.getConfig(
        (err, HeThong) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(HeThong);
            }
        }
    );
}

exports.updateSystem = (req, res) => {
    const HeThongReqData = new HeThongModel(req.body);
    HeThongModel.updateSystem(
        HeThongReqData,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Updated successfully' });
            }
        }
    );
}