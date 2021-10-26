var dbConnect = require('../db.config');

var KetQuaThi = function (KetQuaThi) {
    this.KT_Id = KetQuaThi.KT_Id;
    this.HV_Id = KetQuaThi.HV_Id;
    this.KQ_LyThuyet = KetQuaThi.KQ_LyThuyet;
    this.KQ_ThucHanh = KetQuaThi.KQ_ThucHanh;
    this.KQ_XepLoai = KetQuaThi.KQ_XepLoai;
    this.KQ_CreateDate = new Date();
    this.KQ_UpdateDate = new Date();
}

KetQuaThi.getAll = (result) => {
    dbConnect.query(
        `
        SELECT *
        FROM KetQuaThi kq
        JOIN KyThi kt ON kt.KT_Id = kq.KT_Id
        JOIN HocVien hv ON hv.HV_Id = kq.HV_Id
        `,
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

KetQuaThi.getById = (id, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM KetQuaThi kq
        JOIN KyThi kt ON kt.KT_Id = kq.KT_Id
        JOIN HocVien hv ON hv.HV_Id = kq.HV_Id
        WHERE (kq.KQ_Id = ?)
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

// KetQuaThi.getByKyThi = (ktId, result) => {
//     dbConnect.query(
//         `
//         SELECT *
//         FROM KetQuaThi kq
//         JOIN KyThi kt ON kt.KT_Id = kq.KT_Id
//         JOIN HocVien hv ON hv.HV_Id = kq.HV_Id
//         WHERE kq.KT_Id = ?
//         `,
//         ktId,
//         (err, res) => {
//             if (err) {
//                 console.log('Error while fetching', err);
//                 result(null, err);
//             } else {
//                 console.log('Selected by KT_Id successfully');
//                 result(null, res);
//             }
//         }
//     );
// }

KetQuaThi.getByHocVien = (hvId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM KetQuaThi kq
        JOIN KyThi kt ON kt.KT_Id = kq.KT_Id
        JOIN HocVien hv ON hv.HV_Id = kq.HV_Id
        WHERE kq.HV_Id = ?
        `,
        hvId,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected by HV_Id successfully');
                result(null, res);
            }
        }
    );
}

KetQuaThi.addNew = (data, result) => {
    dbConnect.query(
        `
        INSERT INTO KetQuaThi SET ?
        `,
        data,
        (err, res) => {
            if (err) {
                console.log('Error while creating', err);
                result(null, err);
            } else {
                console.log('Created successfully');
                result(null, res);
            }
        }
    );
}

KetQuaThi.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE KetQuaThi
        SET
            KT_Id = ?,
            HV_Id = ?,
            KQ_LyThuyet = ?,
            KQ_ThucHanh = ?,
            KQ_XepLoai = ?,
            KQ_UpdateDate = CURRENT_TIMESTAMP()
        WHERE KQ.Id = ?
        `,
        [
            data.KT_Id,
            data.HV_Id,
            data.KQ_LyThuyet,
            data.KQ_ThucHanh,
            data.KQ_XepLoai,
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error while updating', err);
                result(null, err);
            } else {
                console.log('Updated successfully');
                result(null, res);
            }
        }
    );
}

module.exports = KetQuaThi;