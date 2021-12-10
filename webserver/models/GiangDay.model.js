const dbConnect = require('../db.config');

var GiangDay = function (GiangDay) {
    this.LH_Id = GiangDay.LH_Id;
    this.GV_Id = GiangDay.GV_Id;
}

GiangDay.getAll = (result) => {
    dbConnect.query(
        `
        SELECT *
        FROM GiangDay gd
        JOIN LopHoc lh ON lh.LH_Id = gd.LH_Id
        JOIN GiaoVien gv On gv.GV_Id = gd.GV_Id
        `,
        (err, res) => {
            if (err) {
                console.log('Error while select', err);
                result(null, err);
            } else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

GiangDay.getByLH = (lhId, result) => {
    dbConnect.query(
        `SELECT *
        FROM GiangDay gd
        JOIN LopHoc lh ON lh.LH_Id = gd.LH_Id
        JOIN GiaoVien gv On gv.GV_Id = gd.GV_Id
        WHERE (gd.LH_Id = ?) AND (lh.LH_IsComplete = 0)`,
        lhId,
        (err, res) => {
            if (err) {
                console.log('Error while select', err);
                result(null, err);
            } else {
                console.log('Selected by GV successfully');
                result(null, res[0]);
            }
        }
    );
}

GiangDay.getByGV = (gvId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM GiangDay gd
        JOIN LopHoc lh ON lh.LH_Id = gd.LH_Id
        JOIN GiaoVien gv On gv.GV_Id = gd.GV_Id
        WHERE (gd.GV_Id = ?) AND (lh.LH_IsComplete = 0)
        `, gvId,
        (err, res) => {
            if (err) {
                console.log('Error while select', err);
                result(null, err);
            } else {
                console.log('Selected by GV successfully');
                result(null, res);
            }
        }
    );
}

GiangDay.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO GiangDay SET ?`,
        data,
        (err, res) => {
            if (err) {
                console.log('Error while create', err);
                result(null, err);
            } else {
                console.log('Created successfully');
                result(null, res);
            }
        }
    );
}

GiangDay.updateByLH = (lhId, data, result) => {
    dbConnect.query(
        `
        UPDATE GiangDay
        SET
            GV_Id = ?
        WHERE LH_Id = ?
        `, [data.GV_Id, lhId],
        (err, res) => {
            if (err) {
                console.log('Error while update', err);
                result(null, err);
            } else {
                console.log('Updated successfully');
                result(null, res);
            }
        }
    );
}

module.exports = GiangDay;