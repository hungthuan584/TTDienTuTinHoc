const dbConnect = require('../db.config');

var ChucVu = function (ChucVu) {
    this.CV_Ten = ChucVu.CV_Ten;
    this.CV_IsDelete = ChucVu.CV_IsDelete;
    this.CV_CreateDate = new Date();
    this.CV_UpdateDate = new Date();
    this.CV_DeleteDate = new Date();
}

ChucVu.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM ChucVu WHERE (CV_Id != 0) AND (CV_IsDelete != 1)`,
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