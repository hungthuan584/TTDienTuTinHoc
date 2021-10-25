var dbConnect = require('../db.config');

var KyThi = function (KyThi) {
    this.KT_Ten = KyThi.KT_Ten;
    this.KT_NgayThi = new Date();
    this.KT_GioThi = KyThi.KT_GioThi;
    this.KT_CreateDate = new Date();
    this.KT_UpdateDate = new Date();
}

KyThi.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM KyThi`,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
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
        `
        SELECT * FROM KyThi WHERE KT_Id = ?
        `,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected by id successfully');
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
                console.log('Error while creating', err);
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
        `
        UPDATE KyThi
        SET
            KT_Ten = ?,
            KT_NgayThi = ?,
            KT_GioThi = ?,
            KT_UpdateDate = CURRENT_TIMESTAMP()
        WHERE KT_Id = ?
        `,
        [
            data.KT_Ten,
            data.KT_NgayThi,
            data.KT_GioThi,
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error while updating', err);
                result(null, err);
            } else {
                console.log('Updated successfully');
                result(null, res);
            }
        }
    );
}

module.exports = KyThi;