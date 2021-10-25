var dbConnect = require('../db.config');

var DanhGia = function (DanhGia) {
    this.TK_TenDangNhap = DanhGia.TK_TenDangNhap;
    this.DG_ChuDe = DanhGia.DG_ChuDe;
    this.DG_NoiDung = DanhGia.DG_NoiDung;
    this.DG_CreateDate = new Date();
    this.DG_UpdateDate = new Date();
    this.DG_IsDelete = DanhGia.DG_IsDelete;
    this.DG_DeleteDate = new Date();
}

DanhGia.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM DanhGia WHERE DG_IsDelete != 1`,
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


DanhGia.getById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM DanhGia WHERE DG_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error While Selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected By Id Successfully');
                result(null, res);
            }
        }
    );
}

DanhGia.getByUsername = (username, result) => {
    dbConnect.query(
        `SELECT * FROM DanhGia WHERE TK_TenDangNhap = ?`,
        username,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected by username successfully');
                result(null, res);
            }
        }
    );
}

DanhGia.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO DanhGia SET ?`,
        data,
        (err, res) => {
            if (err) {
                console.log('Error While Creating', err);
                result(null, err);
            }
            else {
                console.log('Created Successfully');
                result(null, res);
            }
        }
    );
}

DanhGia.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE DanhGia
        SET 
            DG_ChuDe = ?,
            DG_NoiDung = ?,
            DG_UpdateDate = CURRENT_TIMESTAMP()
        WHERE DG_Id = ?
        `,
        [
            data.DG_ChuDe,
            data.DG_NoiDung,
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error While Updating', err);
                result(null, err);
            }
            else {
                console.log('Updated Successfully');
                result(null, res);
            }
        }
    );
}

DanhGia.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE DanhGia
        SET 
            DG_IsDelete = 1,
            DG_DeleteDate = CURRENT_TIMESTAMP()
        WHERE DG_Id = ?
        `,
        id,
        (err, res) => {
            if (err) {
                console.log('Error While Deleting', err);
                result(null, err);
            }
            else {
                console.log('Deleted Successfully');
                result(null, res);
            }
        }
    );
}