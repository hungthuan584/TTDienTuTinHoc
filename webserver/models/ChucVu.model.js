const dbConnect = require('../db.config');

var ChucVu = function (ChucVu) {
    this.CV_Ten = ChucVu.CV_Ten;
    this.CV_MoTa = ChucVu.CV_MoTa;
}

ChucVu.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM ChucVu WHERE CV_Id != 0`,
        (err, res) => {
            if (err) {
                console.log('Error while selecting');
                result(null, err);
            } else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

module.exports = ChucVu;