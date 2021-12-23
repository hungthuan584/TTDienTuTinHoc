const dbConnect = require('../db.config');

var DotThi = function (DotThi) {
    this.DT_Ten = DotThi.DT_Ten;
    this.DT_HanDangKy = DotThi.DT_HanDangKy;
    this.DT_IsActive = DotThi.DT_IsActive;
    this.DT_IsComplete = DotThi.DT_IsComplete;
    this.DT_CreateDate = new Date();
    this.DT_UpdateDate = new Date();
}

DotThi.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM DotThi ORDER BY DT_Id DESC`,
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

DotThi.getCurrent = (result) => {
    dbConnect.query(
        `SELECT * FROM DotThi WHERE DT_IsComplete = 0`,
        (err, res) => {
            if (err) {
                console.log('Error while select', err);
                result(null, err);
            } else {
                console.log('Selected current successfully');
                result(null, res[0]);
            }
        }
    );
}

DotThi.getById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM DotThi WHERE DT_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while select', err);
                result(null, err);
            } else {
                console.log('Selected current successfully');
                result(null, res[0]);
            }
        }
    );
}

DotThi.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO DotThi SET ?`,
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

DotThi.updateById = (id, data, result) => {
    dbConnect.query(
        `UPDATE DotThi
        SET
            DT_Ten = ?,
            DT_HanDangKy = ?,
            DT_UpdateDate = CURRENT_TIMESTAMP()
        WHERE DT_Id = ?`,
        [data.DT_Ten, data.DT_HanDangKy, id],
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

DotThi.completeById = (id, result) => {
    dbConnect.query(
        `UPDATE DotThi
        SET
            DT_IsComplete = 1
        WHERE DT_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while complete', err);
                result(null, err);
            } else {
                console.log('Completed successfully');
                result(null, res);
            }
        }
    );
}

DotThi.lockRegister = (id, result) => {
    dbConnect.query(
        `UPDATE DotThi
        SET
            DT_IsActive = 0
        WHERE DT_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while lock', err);
                result(null, err);
            } else {
                console.log('Locked successfully');
                result(null, res);
            }
        }
    );
}

module.exports = DotThi;