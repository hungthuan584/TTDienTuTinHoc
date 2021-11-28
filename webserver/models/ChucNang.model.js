const dbConnect = require('../db.config');

var ChucNang = function (ChucNang) {
    this.CN_Ten = ChucNang.CN_Ten;
}

ChucNang.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM ChucNang`,
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

module.exports = ChucNang;