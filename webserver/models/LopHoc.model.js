var dbConnect = require('../db.config');

var LopHoc = function (LopHoc) {
    this.LH_Id = LopHoc.LH_Id;
    this.LDT_Id = LopHoc.LDT_Id;
    this.CB_Id = LopHoc.CB_Id;
    this.PH_Id = LopHoc.PH_Id;
    this.LH_BuoiHoc = LopHoc.LH_BuoiHoc;
    this.LH_ThoiGianHoc = LopHoc.LH_ThoiGianHoc;
    this.LH_SiSo = LopHoc.LH_SiSo;
    this.LH_NgayKhaiGiang = LopHoc.LH_NgayKhaiGiang;
    this.LH_IsDelete = LopHoc.LH_IsDelete;
    this.LH_CreateDate = new Date();
    this.LH_UpdateDate = new Date();
    this.LH_DeleteDate = new Date();
}

// Danh sach lop hoc
LopHoc.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM LopHoc lh JOIN LopDaoTao ldt ON ldt.LDT_Id = lh.LDT_Id JOIN PhongHoc ph ON ph.PH_Id = lh.PH_Id WHERE lh.LH_IsDelete != 1`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Selected Successfully');
                result(null, res);
            }
        }
    );
}
// Get by Id
LopHoc.getById = (id, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM LopHoc lh 
        JOIN LopDaoTao ldt ON ldt.LDT_Id = lh.LDT_Id
        JOIN PhongHoc ph ON ph.PH_Id = lh.PH_Id
        WHERE lh.LH_Id = ?
        `,
        id,
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

LopHoc.countNumber = (ldtId, result) => {
    dbConnect.query(
        `SELECT * FROM LopHoc WHERE LDT_Id like ?`,
        ldtId,
        (err, res) => {
            if (err) {
                console.log('Error while count', err);
                result(null, err);
            }
            else {
                console.log('Count Successfully');
                result(null, res);
            }
        }
    );
}

// Them 
LopHoc.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO LopHoc SET ?`,
        data,
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
LopHoc.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE LopHoc
        SET
            LDT_Id = ?,
            CB_Id = ?,
            LH_SiSo = ?,
            LH_NgayKhaiGiang = ?,
            LH_UpdateDate = CURRENT_TIMESTAMP()
        WHERE LH_Id = ?
        `,
        [
            data.LDT_Id,
            data.CB_Id,
            data.PH_Id,
            data.LH_BuoiHoc,
            data.LH_ThoiGianHoc,
            data.LH_SiSo,
            data.LH_NgayKhaiGiang,
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

LopHoc.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE LopHoc
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