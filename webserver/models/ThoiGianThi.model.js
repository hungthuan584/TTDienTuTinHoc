const dbConnect = require('../db.config');

var ThoiGianThi = function (ThoiGianThi) {
    this.TGT_Ten = ThoiGianThi.TGT_Ten;
}

ThoiGianThi.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM ThoiGianThi`,
        (err, res) => {
            if (err) {
                console(err);
                result(null, err);
            } else {
                console.log('Get successfully');
                result(null, res);
            }
        }
    );
}

module.exports = ThoiGianThi;