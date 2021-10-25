var dbConnect = require('../db.config');

var GiaoVien = function (GiaoVien) {
    this.GV_Id = GiaoVien.GV_Id;
    this.GV_HoTen = GiaoVien.GV_HoTen;
    this.GV_GioiTinh = GiaoVien.GV_GioiTinh;
    this.GV_NgaySinh = new Date();
    this.GV_Cmnd = GiaoVien.GV_Cmnd;
    this.GV_DiaChi = GiaoVien.GV_DiaChi;
    this.GV_Sdt = GiaoVien.GV_Sdt;
    this.GV_Email = GiaoVien.GV_Email;
    this.GV_HocVi = GiaoVien.GV_HocVi;
    this.GV_ChuyenNganh = GiaoVien.GV_ChuyenNganh;
    this.GV_CreateDate = new Date();
    this.GV_UpdateDate = new Date();
    this.GV_IsDelete = GiaoVien.GV_IsDelete;
    this.GV_DeleteDate = new Date();
}

GiaoVien.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM GiaoVien WHERE GV_IsDelete != 1`,
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

GiaoVien.getById = (id, result) => {
    dbConnect.query(
        `
        SELECT * FROM GiaoVien
        WHERE GV_Id = ?
        `,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected by id successfully');
                result(null, res);
            }
        }
    );
}

GiaoVien.getByUsername = (username, result) => {
    dbConnect.query(
        `SELECT * FROM GiaoVien WHERE TK_TenDangNhap = ?`,
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

// Them hoc vien
GiaoVien.addGiaoVien = (data, result) => {
    dbConnect.query(
        `INSERT INTO GiaoVien SET ?`,
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

// Sua thong tin hoc vien
GiaoVien.updateGiaoVien = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE GiaoVien
	    SET
            GV_HoTen = ?,
            GV_GioiTinh = ?,
            GV_NgaySinh = ?,
            GV_Cmnd = ?,
            GV_DiaChi = ?,
            GV_Sdt = ?,
            GV_Email = ?,
            GV_HocVi = ?,
            GV_ChuyenNganh = ?,
            GV_UpdateDate = CURRENT_TIMESTAMP()
	    WHERE GV_Id = ?
        `,
        [
            data.GV_HoTen,
            data.GV_GioiTinh,
            data.GV_NgaySinh,
            data.GV_Cmnd,
            data.GV_DiaChi,
            data.GV_Sdt,
            data.GV_Email,
            data.GV_HocVi,
            data.GV_ChuyenNganh,
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error While Updating', err);
                result(err, null);
            } else {
                console.log('Updated Successfully!');
                result(null, res);
            }
        }
    );
}

// Xoa hoc vien
GiaoVien.deleteGiaoVien = (id, result) => {
    dbConnect.query(
        `
        UPDATE GiaoVien
        SET
            GV_IsDelete = 1,
            GV_DeleteDate = CURRENT_TIMESTAMP()
        WHERE GV_Id = ?
        `,
        id,
        (err, res) => {
            if (err) {
                console.log('Error While Delete Data', err);
                result(err, null);
            } else {
                console.log('Data Deleted Successfully!');
                result(null, res);
            }
        }
    );
}

module.exports = GiaoVien;