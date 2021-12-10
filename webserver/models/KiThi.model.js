const dbConnect = require('../db.config');

var KyThi = function (KyThi) {
    this.KT_Id = KyThi.KT_Id;
    this.CC_Id = KyThi.CC_Id;
    this.KT_NgayThi = KyThi.KT_NgayThi;
    this.DT_Id = KyThi.DT_Id;
    this.KT_CreateDate = new Date();
    this.KT_UpdateDate = new Date();
}

KyThi.getAll = (result) => {
    dbConnect.query(
        `SELECT *
        FROM KyThi kt
        JOIN ChungChi cc ON cc.CC_Id = kt.CC_Id
        JOIN DotThi dt ON dt.DT_Id = kt.DT_Id
        ORDER BY kt.KT_NgayThi DESC`,
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

KyThi.getById = (id, result) => {
    dbConnect.query(
        `SELECT *
        FROM KyThi kt
        JOIN ChungChi cc ON cc.CC_Id = kt.CC_Id
        JOIN DotThi dt ON dt.DT_Id = kt.DT_Id
        WHERE kt.KT_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while select', err);
                result(null, err);
            } else {
                console.log('Selected by Id successfully');
                result(null, res[0]);
            }
        }
    );
}

KyThi.getByCC = (id, result) => {
    dbConnect.query(
        `SELECT *
        FROM KyThi kt
        JOIN ChungChi cc ON cc.CC_Id = kt.CC_Id
        JOIN DotThi dt ON dt.DT_Id = kt.DT_Id
        WHERE kt.CC_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while select', err);
                result(null, err);
            } else {
                console.log('Selected by CC successfully');
                result(null, res[0]);
            }
        }
    );
}

KyThi.getByDT = (id, result) => {
    dbConnect.query(
        `SELECT *
        FROM KyThi kt
        JOIN ChungChi cc ON cc.CC_Id = kt.CC_Id
        JOIN DotThi dt ON dt.DT_Id = kt.DT_Id
        WHERE kt.DT_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while select', err);
                result(null, err);
            } else {
                console.log('Selected by DT successfully');
                result(null, res);
            }
        }
    );
}

KyThi.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO KyThi SET ?`,
        data,
        (err, res) => {
            if (err) {
                console.log('Error while create', err);
                result(null, err);
            } else {
                console.log('Created successfully');
                result(null, res);
            }
        }
    );
}

KyThi.updateById = (id, data, result) => {
    dbConnect.query(
        `UPDATE KyThi
        SET
            CC_Id = ?,
            KT_NgayThi = ?,
            DT_Id = ?,
            KT_UpdateDate = CURRENT_TIMESTAMP()
        WHERE KT_Id = ?`,
        [data.CC_Id, data.KT_NgayThi, data.DT_Id, id],
        (err, res) => {
            if (err) {
                console.log('Error while update', err);
                result(null, err);
            } else {
                console.log('Updated successfully');
                result(null, res);
            }
        }
    );
}

module.exports = KyThi;