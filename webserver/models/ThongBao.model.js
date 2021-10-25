var dbConnect = require('../db.config');

var ThongBao = function (ThongBao) {
    this.TB_Id = ThongBao.TB_Id;
    this.GV_Id = ThongBao.GV_Id;
    this.LH_Id = ThongBao.LH_Id;
    this.TB_NoiDung = ThongBao.TB_NoiDung;
    this.TB_CreateDate = new Date();
    this.TB_UpdateDate = new Date();
    this.TB_IsDelete = ThongBao.TB_IsDelete;
    this.TB_DeleteDate = new Date();
}

ThongBao.getAdd = (result) => {
    dbConnect.query(
        `
        SELECT * 
        FROM ThongBao tb
        JOIN GiaoVien gv ON gv.GV_Id = tb.GV_Id
        JOIN LopHoc ON lh.LH_Id = tb.LH_Id
        WHERE TB_IsDelete != 1
        `,
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

ThongBao.getById = (id, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM ThongBao tb
        JOIN GiaoVien gv ON gv.GV_Id = tb.GV_Id
        JOIN LopHoc ON lh.LH_Id = tb.LH_Id
        WHERE tb.TB_Id = ?
        `,
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

ThongBao.getByLopHoc = (lhId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM ThongBao tb
        JOIN GiaoVien gv ON gv.GV_Id = tb.GV_Id
        JOIN LopHoc ON lh.LH_Id = tb.LH_Id
        WHERE tb.LH_Id = ?
        `,
        lhId,
        (err, res) => {
            if (err) {
                console.log('Error While Selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected By LH_Id Successfully');
                result(null, res);
            }
        }
    );
}

ThongBao.getByGiaoVien = (gvId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM ThongBao tb
        JOIN GiaoVien gv ON gv.GV_Id = tb.GV_Id
        JOIN LopHoc ON lh.LH_Id = tb.LH_Id
        WHERE tb.GV_Id = ?
        `,
        gvId,
        (err, res) => {
            if (err) {
                console.log('Error While Selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected By GV_Id Successfully');
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

ThongBao.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE ThongBao
        SET 
            GV_Id = ?,
            LH_Id = ?,
            TB_NoiDung = ?,
            TB_UpdateDate = CURRENT_TIMESTAMP()
        WHERE TB_Id = ?
        `,
        [
            data.GV_Id,
            data.LH_Id,
            data.TB_NoiDung,
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