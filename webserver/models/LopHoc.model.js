var dbConnect = require('../db.config');

var LopHoc = function (LopHoc) {
    this.LH_Id = LopHoc.LH_Id;
    this.LDT_Id = LopHoc.LDT_Id;
    this.LH_SiSo = LopHoc.LH_SiSo;
    this.TG_Id = LopHoc.TG_Id;
    this.PH_Id = LopHoc.PH_Id;
    this.LH_NgayKhaiGiang = LopHoc.LH_NgayKhaiGiang;
    this.LH_IsActive = LopHoc.LH_IsActive;
    this.LH_IsComplete = LopHoc.LH_IsComplete;
    this.LH_CreateDate = new Date();
    this.LH_UpdateDate = new Date();
    this.LH_CompleteDate = new Date();
}

// Danh sach lop hoc
LopHoc.getOpening = (result) => {
    dbConnect.query(
        `SELECT
            lh.LH_Id,lh.LH_SiSo, lh.LH_NgayKhaiGiang, lh.LH_IsActive, lh.LH_IsComplete, lh.LH_CreateDate, lh.LH_UpdateDate, lh.LH_CompleteDate,
            ldt.LDT_Ten,tg.TG_Ten, tg.TG_ThoiGianHoc,ph.PH_Ten,gv.GV_HoTen
        FROM LopHoc lh
        JOIN LopDaoTao ldt ON ldt.LDT_Id = lh.LDT_Id
        JOIN PhongHoc ph ON ph.PH_Id = lh.PH_Id
        JOIN ThoiGianHoc tg ON tg.TG_Id = lh.TG_Id
        LEFT JOIN giangday gd ON gd.LH_Id = lh.LH_Id
        LEFT JOIN giaovien gv ON gv.GV_Id = gd.GV_Id
        WHERE lh.LH_IsComplete != 1`,
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

LopHoc.getCompleted = (result) => {
    dbConnect.query(
        `SELECT *
        FROM LopHoc lh
        JOIN LopDaoTao ldt ON ldt.LDT_Id = lh.LDT_Id
        JOIN PhongHoc ph ON ph.PH_Id = lh.PH_Id
        JOIN ThoiGianHoc tg ON tg.TG_Id = lh.TG_Id
        WHERE lh.LH_IsComplete = 1`,
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
        JOIN ThoiGianHoc tg ON tg.TG_Id = lh.TG_Id
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

LopHoc.getByPH = (phId, result) => {
    dbConnect.query(
        `SELECT * FROM LopHoc WHERE (PH_Id = ?) AND (LH_IsComplete != 1)`, phId,
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
        UPDATE lophoc
        SET
            LDT_Id = ?,
            TG_Id = ?,
            PH_Id = ?,
            LH_SiSo = ?,
            LH_NgayKhaiGiang = ?,
            LH_UpdateDate = CURRENT_TIMESTAMP()
        WHERE LH_Id = ?
        `,
        [
            data.LDT_Id,
            data.TG_Id,
            data.PH_Id,
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


LopHoc.deActivate = (id, result) => {
    dbConnect.query(
        `UPDATE LopHoc SET LH_IsActive = 0 WHERE LH_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error deactivating');
                result(err, null);
            } else {
                console.log('Deactivated Successfully!');
                result(null, res);
            }
        }
    );
}
LopHoc.activeRegister = (id, result) => {
    dbConnect.query(
        `UPDATE LopHoc SET LH_IsActive = 1 WHERE LH_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error deactivating');
                result(err, null);
            } else {
                console.log('Deactivated Successfully!');
                result(null, res);
            }
        }
    );
}

LopHoc.isComplete = (id, result) => {
    dbConnect.query(
        `
        UPDATE LopHoc
        SET
            LH_IsComplete = 1,
            LH_CompleteDate = CURRENT_TIMESTAMP()
        WHERE LH_Id = ?
        `,
        id,
        (err, res) => {
            if (err) {
                console.log('Error While Checking');
                result(err, null);
            } else {
                console.log('Checked Successfully!');
                result(null, res);
            }
        }
    );
}

module.exports = LopHoc;