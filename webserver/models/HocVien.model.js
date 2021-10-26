var dbConnect = require('../db.config');

var HocVien = function (HocVien) {
    this.HV_Id = HocVien.HV_Id;
    this.HV_HoTen = HocVien.HV_HoTen;
    this.HV_GioiTinh = HocVien.HV_GioiTinh;
    this.HV_NgaySinh = new Date();
    this.HV_Cmnd = HocVien.HV_Cmnd;
    this.HV_DiaChi = HocVien.HV_DiaChi;
    this.HV_Sdt = HocVien.HV_Sdt;
    this.HV_Email = HocVien.HV_Email;
    this.HV_SinhVien = HocVien.HV_SinhVien;
    this.HV_Mssv = HocVien.HV_Mssv;
    this.TK_TenDangNhap = HocVien.TK_TenDangNhap;
    this.HV_CreateDate = new Date();
    this.HV_UpdateDate = new Date();
    this.HV_IsDelete = HocVien.HV_IsDelete;
    this.HV_DeleteDate = new Date();
}

// Danh sach hoc vien
HocVien.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM HocVien WHERE HV_IsDelete != 1`,
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


// Danh sach hoc vien dang ky nam hien tai
HocVien.getByYear = (result) => {
    dbConnect.query(
        `SELECT * FROM HocVien WHERE YEAR(HV_CreateDate) = YEAR(CURDATE())`,
        (err, res) => {
            if (err) {
                console.log('Error :', err);
                result(null, err);
            }
            else {
                console.log('Successfully');
                result(null, res);
            }
        }
    );
}

// Get hoc vien by Id
HocVien.getById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM HocVien WHERE HV_Id = ?`,
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

HocVien.getByUsername = (username, result) => {
    dbConnect.query(
        `SELECT * FROM HocVien WHERE TK_TenDangNhap = ?`,
        username,
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

// Them hoc vien
HocVien.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO HocVien SET ?`,
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

// Sua thong tin hoc vien
HocVien.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE HocVien
	    SET
            HV_HoTen = ?,
            HV_GioiTinh = ?,
            HV_NgaySinh = ?,
            HV_Cmnd = ?,
            HV_DiaChi = ?,
            HV_Sdt = ?,
            HV_Email = ?,
            HV_SinhVien = ?,
            HV_Mssv = ?,
            HV_UpdateDate = CURRENT_TIMESTAMP()
	    WHERE HV_Id = ?
        `,
        [
            data.HV_HoTen,
            data.HV_GioiTinh,
            data.HV_NgaySinh,
            data.HV_Cmnd,
            data.HV_DiaChi,
            data.HV_Sdt,
            data.HV_Email,
            data.HV_SinhVien,
            data.HV_Mssv,
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error While Updating Data', err);
                result(err, null);
            } else {
                console.log('Data Updated Successfully!');
                result(null, res);
            }
        }
    );
}

// Xoa hoc vien
HocVien.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE HocVien
        SET
            HV_IsDelete = 1,
            HV_DeleteDate = CURRENT_TIMESTAMP()
        WHERE HV_Id = ?
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

module.exports = HocVien;