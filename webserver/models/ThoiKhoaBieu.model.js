var dbConnect = require('../db.config');

var ThoiKhoaBieu = function (ThoiKhoaBieu) {
    this.TKB_Id = ThoiKhoaBieu.TKB_Id;
    this.PH_Id = ThoiKhoaBieu.PH_Id;
    this.LH_Id = ThoiKhoaBieu.LH_Id;
    this.TKB_NgayHoc = ThoiKhoaBieu.TKB_NgayHoc;
    this.TKB_GioBatDau = ThoiKhoaBieu.TKB_GioBatDau;
    this.TKB_GioKetThuc = ThoiKhoaBieu.TKB_GioKetThuc;
    this.TKB_CreateDate = new Date();
    this.TKB_UpdateDate = new Date();
    this.TKB_IsDelete = ThoiKhoaBieu.TKB_IsDelete;
    this.TKB_DeleteDate = new Date();
}

ThoiKhoaBieu.getAdd = (result) => {
    dbConnect.query(
        `
        SELECT *
        FROM ThoiKhoaBieu tkb
        JOIN PhongHoc ph ON ph.PH_Id = tkb.PH_Id
        JOIN LopHoc lh ON lh.LH_Id = tkb.LH_Id
        WHERE tkb.TKB_IsDelete != 1
        `,
        (err, res) => {
            if (err) {
                console.log('Error while selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

ThoiKhoaBieu.getById = (id, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM ThoiKhoaBieu tkb
        JOIN PhongHoc ph ON ph.PH_Id = tkb.PH_Id
        JOIN LopHoc lh ON lh.LH_Id = tkb.LH_Id
        WHERE 
            (tkb.TKB_Id = '${id}') OR (tkb.LH_Id = '${id}')
        `,
        (err, res) => {
            if (err) {
                console.log('Error while selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected By Id Successfully');
                result(null, res);
            }
        }
    );
}

// ThoiKhoaBieu.getByLopHoc = (lhId, result) => {
//     dbConnect.query(
//         `
//         SELECT *
//         FROM ThoiKhoaBieu tkb
//         JOIN PhongHoc ph ON ph.PH_Id = tkb.PH_Id
//         JOIN LopHoc lh ON lh.LH_Id = tkb.LH_Id
//         WHERE tkb.LH_Id = ?
//         `,
//         lhId,
//         (err, res) => {
//             if (err) {
//                 console.log('Error While Selecting', err);
//                 result(null, err);
//             }
//             else {
//                 console.log('Selected By LH_Id Successfully');
//                 result(null, res);
//             }
//         }
//     );
// }

ThoiKhoaBieu.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO ThoiKhoaBieu SET ?`,
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

ThoiKhoaBieu.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE ThoiKhoaBieu
        SET 
            PH_Id = ?,
            LH_Id = ?,
            TKB_NgayHoc = ?,
            TKB_GioBatDau = ?,
            TKB_GioKetThuc = ?,
            TB_UpdateDate = CURRENT_TIMESTAMP()
        WHERE TKB_Id = ?
        `,
        [
            data.PH_Id,
            data.LH_Id,
            data.TKB_NgayHoc,
            data.TKB_GioBatDau,
            data.TKB_GioKetThuc,
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error While Updating', err);
                result(null, err);
            }
            else {
                console.log('Updated Successfully');
                result(null, res);
            }
        }
    );
}

ThoiKhoaBieu.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE ThoiKhoaBieu
        SET 
            TKB_IsDelete = 1,
            TKB_DeleteDate = CURRENT_TIMESTAMP()
        WHERE TKB_Id = ?
        `,
        id,
        (err, res) => {
            if (err) {
                console.log('Error While Deleting', err);
                result(null, err);
            }
            else {
                console.log('Deleted Successfully');
                result(null, res);
            }
        }
    );
}

module.exports = ThoiKhoaBieu;