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
    this.HV_AnhDaiDien = HocVien.HV_AnhDaiDien;
    this.HV_SinhVien = HocVien.HV_SinhVien;
    this.HV_Mssv = HocVien.HV_Mssv;
    this.HV_TenDangNhap = HocVien.HV_TenDangNhap;
    this.HV_CreateDate = new Date();
    this.HV_UpdateDate = new Date();
    this.HV_IsDelete = HocVien.HV_IsDelete;
    this.HV_DeleteDate = new Date();
}

// Danh sach hoc vien
HocVien.getAllHocVien = (result) => {
    dbConnect.query(
        `SELECT * FROM hocvien WHERE HV_IsDelete != 1`,
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
HocVien.getHocVienByYear = (result) => {
    dbConnect.query(
        `SELECT * FROM hocvien WHERE YEAR(HV_CreateDate) = YEAR(CURDATE())`,
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
HocVien.getHocVienById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM hocvien WHERE HV_Id = ?`,
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

// Them hoc vien
HocVien.addHocVien = (HocVienReqData, result) => {
    dbConnect.query(
        `INSERT INTO hocvien SET ?`,
        HocVienReqData,
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
HocVien.updateHocVien = (id, HocVienReqData, result) => {
    dbConnect.query(
        `
        UPDATE hocvien
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
            HocVienReqData.HV_HoTen,
            HocVienReqData.HV_GioiTinh,
            HocVienReqData.HV_NgaySinh,
            HocVienReqData.HV_Cmnd,
            HocVienReqData.HV_DiaChi,
            HocVienReqData.HV_Sdt,
            HocVienReqData.HV_Email,
            HocVienReqData.HV_SinhVien,
            HocVienReqData.HV_Mssv,
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

// Xoa hoc vien
HocVien.deleteHocVien = (id, result) => {
    dbConnect.query(
        `
        UPDATE hocvien
        SET
            HV_IsDelete = 1,
            HV_DeleteDate = CURRENT_TIMESTAMP()
        WHERE HV_Id = ?
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

module.exports = HocVien;