var dbConnect = require('../db.config');

var ThongBao = function (ThongBao) {
    this.TB_Id = ThongBao.TB_Id;
    this.LH_Id = ThongBao.LH_Id;
    this.TB_NoiDung = ThongBao.TB_NoiDung;
    this.TB_CreateBy = ThongBao.TB_CreateBy;
    this.TB_UpdateBy = ThongBao.TB_UpdateBy;
    this.TB_IsDelete = ThongBao.TB_IsDelete;
    this.TB_CreateDate = new Date();
    this.TB_UpdateDate = new Date();
    this.TB_DeleteDate = new Date();
}

ThongBao.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM ThongBao tb JOIN LopHoc lh ON lh.LH_Id = tb.LH_Id WHERE TB_IsDelete != 1`,
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

ThongBao.conutNumber = (result) => {
    dbConnect.query(
        `SELECT * FROM ThongBao`,
        (err, res) => {
            if (err) {
                console.log('Error while counting');
                result(null, err);
            }
            else {
                console.log('Counted successfully');
                result(null, res);
            }
        }
    );
}

ThongBao.getById = (id, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM ThongBao tb
        JOIN LopHoc lh ON lh.LH_Id = tb.LH_Id
        JOIN LopDaoTao ldt ON ldt.LDT_Id = lh.LDT_Id
        WHERE 
            tb.TB_Id = ?
        `, id,
        (err, res) => {
            if (err) {
                console.log('Error while selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected by id Successfully');
                result(null, res[0]);
            }
        }
    );
}
ThongBao.getByLopHoc = (lhId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM ThongBao tb
        JOIN LopHoc lh ON lh.LH_Id = tb.LH_Id
        JOIN LopDaoTao ldt ON ldt.LDT_Id = lh.LDT_Id
        WHERE 
            tb.LH_Id = ?
        ORDER BY tb.TB_CreateDate DESC
        `, lhId,
        (err, res) => {
            if (err) {
                console.log('Error while selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected by id Successfully');
                result(null, res);
            }
        }
    );
}

ThongBao.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO ThongBao SET ?`,
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

ThongBao.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE ThongBao
        SET 
            TB_NoiDung = ?,
            TB_UpdateBy = ?,
            TB_UpdateDate = CURRENT_TIMESTAMP()
        WHERE TB_Id = ?
        `,
        [
            data.TB_NoiDung,
            data.TB_UpdateBy,
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

ThongBao.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE ThongBao
        SET 
            TB_IsDelete = 1,
            TB_DeleteDate = CURRENT_TIMESTAMP()
        WHERE TB_Id = ?
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

module.exports = ThongBao;