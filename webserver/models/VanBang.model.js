var dbConnect = require('../db.config');

var VanBang = function (VanBang) {
    this.VB_Ten = VanBang.VB_Ten;
    this.VB_DiemChuan = VanBang.VB_DiemChuan;
    this.VB_CreateDate = new Date();
    this.VB_UpdateDate = new Date();
    this.VB_IsDelete = VanBang.VB_IsDelete;
    this.VB_DeleteDate = new Date();
}

VanBang.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM VanBang WHERE VB_IsDelete != `,
        (err, res) => {
            if (err) {
                console.log('Error While Selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected Successfully');
                result(null, res);
            }
        }
    );
}

VanBang.getById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM VanBang WHERE VB_Id = ?`,
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

VanBang.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO VanBang SET ?`,
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

VanBang.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE VanBang
        SET 
            VB_Ten = ?,
            VB_DiemChuan = ?,
            VB_UpdateDate = CURRENT_TIMESTAMP()
        WHERE VB_Id = ?
        `,
        [
            data.VB_Ten,
            data.VB_DiemChuan,
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

VanBang.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE VanBang
        SET 
            VB_IsDelete = 1,
            VB_DeleteDate = CURRENT_TIMESTAMP()
        WHERE VB_Id = ?
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

module.exports = VanBang;