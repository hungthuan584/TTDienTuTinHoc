var dbConnect = require('../db.config');

var Module = function (Module) {
    this.MD_Id = Module.MD_Id;
    this.MD_Ten = Module.MD_Ten;
    this.MD_NangCao = Module.MD_NangCao;
}

Module.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM Module`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            } else {
                console.log('Selected Successfully');
                result(null, res);
            }
        }
    );
}

Module.getAdvanced = (result) => {
    dbConnect.query(
        `SELECT * FROM Module WHERE MD_NangCao >= 7 ORDER BY MD_NangCao ASC`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            } else {
                console.log('Selected Successfully');
                result(null, res);
            }
        }
    );
}

module.exports = Module;