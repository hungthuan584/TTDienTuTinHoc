var dbConnect = require('../db.config');

var LopDaoTao = function (LopDaoTao) {
    this.LDT_Id = LopDaoTao.LDT_Id;
    this.LDT_Ten = LopDaoTao.LDT_Ten;
    this.LDT_LePhi = LopDaoTao.LDT_LePhi;
    this.LDT_LePhiSinhVien = LopDaoTao.LDT_LePhiSinhVien;
    this.LDT_IsDelete = LopDaoTao.LDT_IsDelte;
    this.LDT_CreateDate = new Date();
    this.LDT_UpdateDate = new Date();
    this.LDT_DeleteDate = new Date();
}

LopDaoTao.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM LopDaoTao WHERE LDT_IsDelete != 1`,
        (err, res) => {
            if (err) {
                console.log('Error while selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

LopDaoTao.getById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM LopDaoTao WHERE LDT_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected by id successfully');
                result(null, res[0]);
            }
        }
    );
}

// Them
LopDaoTao.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO LopDaoTao SET ?`,
        data,
        (err, res) => {
            if (err) {
                console.log('Error while creating', err);
                result(null, err);
            }
            else {
                console.log('Created successfully');
                result(null, res);
            }
        }
    );
}

// Sua
LopDaoTao.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE LopDaoTao 
        SET
            LDT_Ten = ?,
            LDT_LePhi = ?,
            LDT_LePhiSinhVien = ?,
            LDT_UpdateDate = CURRENT_TIMESTAMP()
        WHERE LDT_Id = ?
        `,
        [
            data.LDT_Ten,
            data.LDT_LePhi,
            data.LDT_LePhiSinhVien,
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error While Updating');
                result(err, null);
            } else {
                console.log('Updated Successfully!');
                result(null, res);
            }
        }
    );
}

// Xoa
LopDaoTao.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE LopDaoTao
        SET
            LDT_IsDelete = 1,
            LDT_DeleteDate = CURRENT_TIMESTAMP()
        WHERE LDT_Id = ?
        `,
        id,
        (err, res) => {
            if (err) {
                console.log('Error While Deleting');
                result(err, null);
            } else {
                console.log('Deleted Successfully!');
                result(null, res);
            }
        }
    );
}

module.exports = LopDaoTao;