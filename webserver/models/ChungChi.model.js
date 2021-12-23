const dbConnect = require('../db.config');

var ChungChi = function (ChungChi) {
    this.CC_Id = ChungChi.CC_Id;
    this.CC_Ten = ChungChi.CC_Ten;
    this.CC_LePhi = ChungChi.CC_LePhi;
    this.CC_DiemChuan = ChungChi.CC_DiemChuan;
    this.CC_IsDelete = ChungChi.CC_IsDelete;
    this.CC_CreateDate = new Date();
    this.CC_UpdateDate = new Date();
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

ChungChi.getById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM ChungChi WHERE CC_Id = ?`, id,
        (err, res) => {
            if (err) {
                console.log('Error while select', err);
                result(null, err);
            } else {
                console.log('Selected by ID successfully');
                result(null, res[0]);
            }
        }
    );
}

ChungChi.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO ChungChi SET ?`, data,
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

ChungChi.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE ChungChi
        SET
            CC_Ten = ?,
            CC_LePhi = ?,
            CC_DiemChuan = ?,
            CC_UpdateDate = CURRENT_TIMESTAMP()
        WHERE CC_Id = ?
        `,
        [
            data.CC_Ten,
            data.CC_LePhi,
            data.CC_DiemChuan,
            id
        ],
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

ChungChi.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE ChungChi
        SET CC_IsDelete = 1 WHERE CC_Id = ?
        `,
        id,
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

module.exports = ChungChi;