var dbConnect = require('../db.config');

var CapDoTaiKhoan = function (CapDoTaiKhoan) {
    this.LV_Id = CapDoTaiKhoan.LV_Id;
    this.LV_Ten = CapDoTaiKhoan.LV_Ten;
}

// Get All
CapDoTaiKhoan.getAllCapDo = (result) => {
    dbConnect.query(
        `SELECT * FROM capdotaikhoan`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            } else {
                console.log('Fetching Successfully');
                result(null, res);
            }
        }
    );
}

module.exports = CapDoTaiKhoan;