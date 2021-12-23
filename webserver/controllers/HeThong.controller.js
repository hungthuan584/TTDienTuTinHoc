const HeThongModel = require('../models/HeThong.model');
const fs = require('fs');
const path = require('path');

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

    if (req.body.Logo) {
        var logoPath = '../files/images/logo.png';
        var bufferLogo = Buffer.from(req.body.Logo.split(',')[1], "base64");

        fs.writeFileSync(path.join(__dirname, logoPath), bufferLogo);
    }

    if (req.body.Poster) {
        var posterPath = '../files/images/poster.png';
        var bufferPoster = Buffer.from(req.body.Poster.split(',')[1], "base64");

        fs.writeFileSync(path.join(__dirname, posterPath), bufferPoster);
    }

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

exports.getImages = (req, res) => {
    var filePath = path.join(__dirname, `../files/images/${req.params.filename}`);
    res.sendFile(filePath);
}