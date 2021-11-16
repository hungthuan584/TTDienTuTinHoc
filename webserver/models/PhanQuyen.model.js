const dbConnect = require('../db.config');

var PhanQuyen = function (PhanQuyen) {
    this.TK_TenDangNhap = PhanQuyen.TK_TenDangNhap;
    this.CN_Id = PhanQuyen.CN_Id;
}

PhanQuyen.checkPermission = (username, functionId, result) => {
    dbConnect.query(
        `SELECT * FROM PhanQuyen WHERE (TK_TenDangNhap = ?) AND (CN_Id = ?)`,
        [
            username, functionId
        ],
        (err, res) => {
            if (err) {
                console.log('Error while checking');
                result(null, err);
            } else {
                console.log('Checked successfully');
                result(null, res[0]);
            }
        }
    );
}

module.exports = PhanQuyen;