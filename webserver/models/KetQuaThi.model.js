var dbConnect = require('../db.config');

var KetQuaThi = function (KetQuaThi) {
    this.KT_Id = KetQuaThi.KT_Id;
    this.HV_Id = KetQuaThi.HV_Id;
    this.KQ_LyThuyet = KetQuaThi.KQ_LyThuyet;
    this.KQ_ThucHanh = KetQuaThi.KQ_ThucHanh;
    this.KQ_DanhGia = KetQuaThi.KQ_DanhGia;
    this.KQ_CreateDate = new Date();
    this.KQ_UpdateDate = new Date();
    this.KQ_IsDelete = KetQuaThi.KQ_IsDelete;
}

KetQuaThi.getInfo = (hvId, ktId, result) => {
    dbConnect.query(
        `SELECT * FROM ketquathi
        WHERE (HV_Id = ?) AND (KT_Id = ?)`,
        [hvId, ktId],
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected by HV_Id successfully');
                result(null, res[0]);
            }
        }
    );
}

KetQuaThi.searchByUser = (data, result) => {
    dbConnect.query(
        `SELECT *
        FROM KetQuaThi kq 
        JOIN HocVien hv ON hv.HV_Id = kq.HV_Id
        JOIN KyThi kt ON kt.KT_Id = kq.KT_Id
        JOIN ChungChi cc ON cc.CC_Id = kt.CC_Id
        ${data}
        `,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected by HV_Id successfully');
                result(null, res[0]);
            }
        }
    );
}

KetQuaThi.getByHocVien = (hvId, result) => {
    dbConnect.query(
        `
        SELECT *
        FROM KetQuaThi kq
        JOIN KyThi kt ON kt.KT_Id = kq.KT_Id
        JOIN ChungChi kt ON cc.CC_Id = kt.CC_Id
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
        INSERT INTO KetQuaThi (HV_Id, KT_Id, KQ_LyThuyet, KQ_ThucHanh, KQ_DanhGia, KQ_IsDelete) VALUES ${data}
        `,
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

KetQuaThi.updateByHocVien = (hvId, ktId, data, result) => {
    dbConnect.query(
        `
        UPDATE KetQuaThi
        SET
            KQ_LyThuyet = ?,
            KQ_ThucHanh = ?,
            KQ_DanhGia = ?,
            KQ_UpdateDate = CURRENT_TIMESTAMP()
        WHERE (HV_Id = ?) AND (KT_Id = ?)
        `,
        [
            data.KQ_LyThuyet,
            data.KQ_ThucHanh,
            data.KQ_DanhGia,
            hvId, ktId
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