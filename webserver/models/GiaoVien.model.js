var dbConnect = require('../db.config');

var GiaoVien = function (GiaoVien) {
    this.GV_Id = GiaoVien.GV_Id;
    this.GV_HoTen = GiaoVien.GV_HoTen;
    this.GV_GioiTinh = GiaoVien.GV_GioiTinh;
    this.GV_NgaySinh = GiaoVien.GV_NgaySinh;
    this.GV_DiaChi = GiaoVien.GV_DiaChi;
    this.GV_Sdt = GiaoVien.GV_Sdt;
    this.GV_Email = GiaoVien.GV_Email;
    this.GV_TrinhDo = GiaoVien.GV_TrinhDo;
    this.TK_TenDangNhap = GiaoVien.TK_TenDangNhap;
    this.GV_IsDelete = GiaoVien.GV_IsDelete;
    this.GV_CreateDate = new Date();
    this.GV_UpdateDate = new Date();
    this.GV_DeleteDate = new Date();
}

GiaoVien.getAll = (result) => {
    dbConnect.query(
        `SELECT gv.GV_Id, gv.GV_HoTen, gv.GV_GioiTinh, gv.GV_DiaChi, gv.GV_Sdt, gv.GV_Email,tk.TK_TenDangNhap ,tk.TK_IsActive
        FROM giaovien gv
        JOIN taikhoan tk ON tk.TK_TenDangNhap = gv.TK_TenDangNhap
        WHERE gv.GV_IsDelete != 1`,
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
        `SELECT * FROM GiaoVien WHERE GV_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected by id successfully');
                result(null, res[0]);
            }
        }
    );
}

GiaoVien.countNumber = (result) => {
    dbConnect.query(
        `SELECT * FROM GiaoVien`,
        (err, res) => {
            if (err) {
                console.log('Error while count');
                result(null, err);
            } else {
                console.log('Count successfully');
                result(null, res);
            }
        }
    );
}

// Them hoc vien
GiaoVien.addNew = (data, result) => {
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
GiaoVien.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE GiaoVien
	    SET
            GV_HoTen = ?,
            GV_GioiTinh = ?,
            GV_NgaySinh = ?,
            GV_DiaChi = ?,
            GV_Sdt = ?,
            GV_Email = ?,
            GV_TrinhDo = ?,
            GV_UpdateDate = CURRENT_TIMESTAMP()
	    WHERE GV_Id = ?
        `,
        [
            data.GV_HoTen,
            data.GV_GioiTinh,
            data.GV_NgaySinh,
            data.GV_DiaChi,
            data.GV_Sdt,
            data.GV_Email,
            data.GV_TrinhDo,
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
GiaoVien.deleteById = (id, result) => {
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
                console.log('Error While Deleting', err);
                result(err, null);
            } else {
                console.log('Deleted Successfully!');
                result(null, res);
            }
        }
    );
}

module.exports = GiaoVien;