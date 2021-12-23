const dbConnect = require('../db.config');

var DanhSachPhongThi = function (DanhSachPhongThi) {
    this.HV_Id = DanhSachPhongThi.HV_Id;
    this.KT_Id = DanhSachPhongThi.KT_Id;
    this.PH_Id = DanhSachPhongThi.PH_Id;
    this.TGT_Id = DanhSachPhongThi.TGT_Id;
    this.DS_CreateDate = new Date();
    this.DS_DeleteDate = new Date();
}

DanhSachPhongThi.getDanhSachPhongThi = (data, result) => {
    dbConnect.query(
        `SELECT *
        FROM danhsachphongthi ds
        JOIN hocvien hv ON hv.HV_Id = ds.HV_Id
        LEFT JOIN ketquathi kq ON kq.HV_Id = hv.HV_Id
        JOIN dangkythi dk ON dk.HV_Id = hv.HV_Id
        JOIN phonghoc ph ON ph.PH_Id = ds.PH_Id
        JOIN kythi kt ON kt.KT_Id = ds.KT_Id
        JOIN chungchi cc ON cc.CC_Id = kt.CC_Id
        JOIN thoigianthi tg ON tg.TGT_Id = ds.TGT_Id
        ${data} `,
        (err, res) => {
            if (err) {
                console.log('Error while select ', err);
                result(null, err);
            } else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

DanhSachPhongThi.addOne = (data, result) => {
    dbConnect.query(
        `INSERT INTO DanhSachPhongThi SET ?`,
        data,
        (err, res) => {
            if (err) {
                console.log('Error while create ', err);
                result(null, err);
            } else {
                console.log('Created successfully');
                result(null, res);
            }
        }
    );
}

DanhSachPhongThi.getByKyThi = (ktId, result) => {
    dbConnect.query(
        `SELECT *
        FROM DanhSachPhongThi ds
        JOIN HocVien hv ON hv.HV_Id = ds.HV_Id
        LEFT JOIN ketquathi kq ON kq.HV_Id = hv.HV_Id
        JOIN KyThi kt ON kt.KT_Id = ds.KT_Id
        JOIN PhongHoc ph ON ph.PH_Id = ds.PH_Id
        WHERE ds.KT_Id = ?`, ktId,
        (err, res) => {
            if (err) {
                console.log('Error while select ', err);
                result(null, err);
            } else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

DanhSachPhongThi.getByPhongThi = (ktId, phId, result) => {
    dbConnect.query(
        `SELECT *
        FROM DanhSachPhongThi ds
        JOIN HocVien hv ON hv.HV_Id = ds.HV_Id
        LEFT JOIN ketquathi kq ON kq.HV_Id = hv.HV_Id
        JOIN KyThi kt ON kt.KT_Id = ds.KT_Id
        JOIN PhongHoc ph ON ph.PH_Id = ds.PH_Id
        WHERE (ds.KT_Id = ?) AND (ds.PH_Id = ?)`, [ktId, phId],
        (err, res) => {
            if (err) {
                console.log('Error while select ', err);
                result(null, err);
            } else {
                console.log('Selected by PH successfully');
                result(null, res);
            }
        }
    );
}

DanhSachPhongThi.addNew = (data, result) => {
    var query = 'INSERT INTO DanhSachPhongThi (HV_Id, KT_Id, PH_Id, TGT_Id) VALUES ';
    for (let i = 0; i < data.length; i++) {
        if (i == data.length - 1) {
            query += `( '${data[i].HV_Id}' , '${data[i].KT_Id}' , ${data[i].PH_Id} , ${data[i].TGT_Id} );`
        } else {
            query += `( '${data[i].HV_Id}' , '${data[i].KT_Id}' , ${data[i].PH_Id} , ${data[i].TGT_Id} ),`
        }
    }
    dbConnect.query(
        query,
        data,
        (err, res) => {
            if (err) {
                console.log('Error while select ', err);
                result(null, err);
            } else {
                console.log('Created successfully');
                result(null, res);
            }
        }
    );
}

DanhSachPhongThi.deleteByHV = (hvId, result) => {
    dbConnect.query(
        `DELETE FROM DanhSachHocVien WHERE HV_Id = ?`, hvId,
        (err, res) => {
            if (err) {
                console.log('Error while delete ', err);
                result(null, err);
            } else {
                console.log('Deleted successfully');
                result(null, res);
            }
        }
    );
}

module.exports = DanhSachPhongThi;