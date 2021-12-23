const dbConnect = require('../db.config');

var BaiViet = function (BaiViet) {
    this.BV_TieuDe = BaiViet.BV_TieuDe;
    this.BV_MoTa = BaiViet.BV_MoTa;
    this.BV_NoiDung = BaiViet.BV_NoiDung;
    this.BV_UploadFile = BaiViet.BV_UploadFile;
    this.BV_IsDelete = BaiViet.BV_IsDelete;
    this.BV_CreateDate = new Date();
    this.BV_UpdateDate = new Date();
}

BaiViet.getNew = (result) => {
    dbConnect.query(
        `SELECT * FROM baiviet WHERE BV_IsDelete !=1 ORDER BY BV_CreateDate DESC`,
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

BaiViet.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM baiviet ORDER BY BV_IsDelete, BV_CreateDate DESC`,
        (err, res) => {
            if (err) {
                console.log('Error while select', err);
                result(null, err);
            } else {
                console.log('Selected all successfully');
                result(null, res);
            }
        }
    );
}

BaiViet.getById = (id, result) => {
    dbConnect.query(
        `
        SELECT * FROM BaiViet WHERE BV_Id = ?
        `, id,
        (err, res) => {
            if (err) {
                console.log('Error while select', err);
                result(null, err);
            } else {
                console.log('Selected successfully');
                result(null, res[0]);
            }
        }
    );
}

BaiViet.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO BaiViet SET ?`,
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

BaiViet.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE BaiViet
        SET
            BV_TieuDe = ?,
            BV_MoTa = ?,
            BV_NoiDung = ?,
            BV_UpdateDate = CURRENT_TIMESTAMP()
        WHERE BV_Id = ?
        `,
        [
            data.BV_TieuDe,
            data.BV_MoTa,
            data.BV_NoiDung,
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

BaiViet.updateWithFile = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE BaiViet
        SET
            BV_TieuDe = ?,
            BV_MoTa = ?,
            BV_NoiDung = ?,
            BV_UploadFile = ?,
            BV_UpdateDate = CURRENT_TIMESTAMP()
        WHERE BV_Id = ?
        `,
        [
            data.BV_TieuDe,
            data.BV_MoTa,
            data.BV_NoiDung,
            data.BV_UploadFile,
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

BaiViet.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE BaiViet
        SET BV_IsDelete = 1
        WHERE BV_Id = ?
        `, id,
        (err, res) => {
            if (err) {
                console.log('Error while delete', err);
                result(null, err);
            } else {
                console.log('Deleted successfully');
                result(null, res);
            }
        }
    );
}

module.exports = BaiViet;