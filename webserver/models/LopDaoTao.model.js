var dbConnect = require('../db.config');

var LopDaoTao = function (LopDaoTao) {
    this.LDT_Id = LopDaoTao.LDT_Id;
    this.LDT_Ten = LopDaoTao.LDT_Ten;
    this.LDT_LePhi = LopDaoTao.LDT_LePhi;
    this.LDT_LePhiSinhVien = LopDaoTao.LDT_LePhiSinhVien;
    this.LDT_CreateDate = new Date();
    this.LDT_UpdateDate = new Date();
    this.LDT_IsDelete = LopDaoTao.LDT_IsDelte;
    this.LDT_DeleteDate = new Date();
}

// Danh sach lop dao tao
LopDaoTao.getAllLopDaoTao = (result) => {
    dbConnect.query(
        `SELECT * FROM lopdaotao WHERE LDT_IsDelete != 1`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Fetching All Data Successfully');
                result(null, res);
            }
        }
    );
}
// Get by Id
LopDaoTao.getLopDaoTaoById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM lopdaotao WHERE LDT_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Fetching By Id Successfully');
                result(null, res[0]);
            }
        }
    );
}

// Them
LopDaoTao.addLopDaoTao = (LopDaoTaoReqData, result) => {
    dbConnect.query(
        `INSERT INTO lopdaotao SET ?`,
        LopDaoTaoReqData,
        (err, res) => {
            if (err) {
                console.log('Error While Creating New Data', err);
                result(null, err);
            }
            else {
                console.log('Data Created Successfully');
                result(null, res);
            }
        }
    );
}

// Sua
LopDaoTao.updateLopDaoTao = (id, LopDaoTaoReqData, result) => {
    dbConnect.query(
        `
        UPDATE lopdaotao 
        SET
            LDT_Ten = ?,LDT_LePhi = ?,LDT_LePhiSinhVien = ?,LDT_UpdateDate = CURRENT_TIMESTAMP()
        WHERE LDT_Id = ?
        `,
        [
            LopDaoTaoReqData.LDT_Ten,
            LopDaoTaoReqData.LDT_LePhi,
            LopDaoTaoReqData.LDT_LePhiSinhVien,
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error While Updating Data');
                result(err, null);
            } else {
                console.log('Data Updated Successfully!');
                result(null, res);
            }
        }
    );
}

// Xoa
LopDaoTao.deleteLopDaoTao = (id, result) => {
    dbConnect.query(
        `
        UPDATE lopdaotao
        SET
            LDT_IsDelete = 1,
            LDT_DeleteDate = CURRENT_TIMESTAMP()
        WHERE LDT_Id = ?
        `,
        id,
        (err, res) => {
            if (err) {
                console.log('Error While Delete Data');
                result(err, null);
            } else {
                console.log('Data Deleted Successfully!');
                result(null, res);
            }
        }
    );
}

module.exports = LopDaoTao;