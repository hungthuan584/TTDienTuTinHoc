var dbConnect = require('../db.config');

var LopHoc = function (LopHoc) {
    this.LH_Id = LopHoc.LH_Id;
    this.LDT_Id = LopHoc.LDT_Id;
    this.GV_Id = LopHoc.GV_Id;
    this.LH_SiSo = LopHoc.LH_SiSo;
    this.LH_NgayKhaiGiang = new Date();
    this.LH_CreateDate = new Date();
    this.LH_UpdateDate = new Date();
    this.LH_IsDelete = LopHoc.IsDelete;
    this.LH_DeleteDate = new Date();
}

// Danh sach lop hoc
LopHoc.getAllLopHoc = (result) => {
    dbConnect.query(
        `SELECT * FROM lophoc WHERE LH_IsDelete != 1`,
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
LopHoc.getLopHocById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM lophoc WHERE LH_Id = ?`,
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
LopHoc.addLopHoc = (LopHocReqData, result) => {
    dbConnect.query(
        `INSERT INTO lophoc SET ?`,
        LopHocReqData,
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
LopHoc.updateLopHoc = (id, LopHocReqData, result) => {
    dbConnect.query(
        `
        UPDATE lophoc
        SET
            LDT_Id = ?,
            GV_Id = ?,
            LH_SiSo = ?,
            LH_NgayKhaiGiang = ?,
            LH_UpdateDate = CURRENT_TIMESTAMP()
        WHERE LH_Id = ?
        `,
        [
            LopHocReqData.LDT_Id,
            LopHocReqData.GV_Id,
            LopHocReqData.LH_SiSo,
            LopHocReqData.LH_NgayKhaiGiang,
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

LopHoc.deleteLopHoc = (id, result) => {
    dbConnect.query(
        `
        UPDATE lophoc
        SET
            LH_IsDelete = 1,
            LH_DeleteDate = CURRENT_TIMESTAMP()
        WHERE LH_Id = ?
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

module.exports = LopHoc;