const dbConnect = require('../db.config');

var ChungChi = function (ChungChi) {
    this.CC_Id = ChungChi.CC_Id;
    this.CC_Ten = ChungChi.CC_Ten;
    this.CC_Module = ChungChi.CC_Module;
}

ChungChi.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM ChungChi`,
        (err, res) => {
            if (err) {
                console.log('Error while select', err);
                result(null, err);
            } else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

module.exports = ChungChi;