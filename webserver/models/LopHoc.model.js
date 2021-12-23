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
}

LopHoc.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM lophoc lh
        JOIN lopdaotao ldt ON ldt.LDT_Id = lh.LDT_Id
        JOIN thoigianhoc tg ON tg.TG_Id = lh.TG_Id
        JOIN phonghoc ph ON ph.PH_Id = lh.PH_Id
        JOIN giangday gd ON gd.LH_Id = lh.LH_Id
        JOIN giaovien gv ON gv.GV_Id = gd.GV_Id
        ORDER BY lh.LH_IsComplete ASC, lh.LH_Id DESC`,
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

// Danh sach lop hoc
LopHoc.getOpening = (result) => {
    dbConnect.query(
        `SELECT *,lh.LH_Id, COUNT(dk.HV_Id) AS soluong
        FROM lophoc lh
        LEFT JOIN dangkyhoc dk ON dk.LH_Id = lh.LH_Id
        JOIN lopdaotao ldt ON ldt.LDT_Id = lh.LDT_Id
        JOIN thoigianhoc tg ON tg.TG_Id = lh.TG_Id
        JOIN phonghoc ph ON ph.PH_Id = lh.PH_Id
        LEFT JOIN giangday gd ON gd.LH_Id = lh.LH_Id
        LEFT JOIN giaovien gv ON gv.GV_Id = gd.GV_Id
        WHERE lh.LH_IsComplete = 0
        GROUP  BY lh.LH_Id;`,
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
        `SELECT *, COUNT(dk.HV_Id) AS soluong
        FROM lophoc lh LEFT JOIN dangkyhoc dk ON dk.LH_Id = lh.LH_Id
        JOIN lopdaotao ldt ON ldt.LDT_Id = lh.LDT_Id
        JOIN thoigianhoc tg ON tg.TG_Id = lh.TG_Id
        JOIN phonghoc ph ON ph.PH_Id = lh.PH_Id
        LEFT JOIN giangday gd ON gd.LH_Id = lh.LH_Id
        LEFT JOIN giaovien gv ON gv.GV_Id = gd.GV_Id
        WHERE lh.LH_IsComplete != 0
        GROUP  BY lh.LH_Id;`,
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

LopHoc.thongKe = (data, result) => {
    dbConnect.query(
        `SELECT *, lh.LH_Id
        FROM lophoc lh
        LEFT JOIN lopdaotao ldt ON ldt.LDT_Id = lh.LDT_Id
        LEFT JOIN thoigianhoc tg ON tg.TG_Id = lh.TG_Id
        LEFT JOIN phonghoc ph ON ph.PH_Id = lh.PH_Id
        LEFT JOIN dangkyhoc dk ON dk.LH_Id = lh.LH_Id
        LEFT JOIN giangday gd ON gd.LH_Id = lh.LH_Id
        LEFT JOIN giaovien gv ON gv.GV_Id = gd.GV_Id
        ${data}
        GROUP BY lh.LH_Id
        ORDER BY lh.LH_IsComplete ASC
        `,
        (err, res) => {
            if (err) {
                console.log('Error While get data', err);
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
        SELECT *,lh.LH_Id, COUNT(dk.HV_Id) AS soluong
        FROM lophoc lh LEFT JOIN dangkyhoc dk ON dk.LH_Id = lh.LH_Id
        JOIN lopdaotao ldt ON ldt.LDT_Id = lh.LDT_Id
        JOIN thoigianhoc tg ON tg.TG_Id = lh.TG_Id
        JOIN phonghoc ph ON ph.PH_Id = lh.PH_Id
        LEFT JOIN giangday gd ON gd.LH_Id = lh.LH_Id
        LEFT JOIN giaovien gv ON gv.GV_Id = gd.GV_Id
        GROUP  BY lh.LH_Id HAVING lh.LH_Id = ?
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

LopHoc.getByInCompleteId = (id, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM LopHoc lh
        JOIN LopDaoTao ldt ON ldt.LDT_Id = lh.LDT_Id
        JOIN PhongHoc ph ON ph.PH_Id = lh.PH_Id
        JOIN ThoiGianHoc tg ON tg.TG_Id = lh.TG_Id
        WHERE (lh.LH_Id = ?) AND (lh.LH_IsComplete = 0)
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
            LH_IsComplete = 1
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