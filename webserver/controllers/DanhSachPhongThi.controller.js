const DanhSachPhongThiModel = require('../models/DanhSachPhongThi.model');

exports.getDanhSachPhongThiByDotThi = (req, res) => {
    var query = `WHERE (kt.DT_Id = ${req.params.dtId})`;
    DanhSachPhongThiModel.getDanhSachPhongThi(
        query,
        (err, DanhSach) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(DanhSach);
            }
        }
    );
}

exports.getDanhSachPhongThi = (req, res) => {
    const key = req.body;
    var query = 'WHERE ';
    if (!key.DT_Id && !key.KT_Id && !key.PH_Id) {
        query = '';
    } else {
        if (key.DT_Id) {
            query += `(kt.DT_Id = ${key.DT_Id}) `;
        }

        if (key.KT_Id && key.DT_Id) {
            query += `AND (ds.KT_Id = '${key.KT_Id}') `;
        } else {
            if (key.KT_Id) {
                query += `(ds.KT_Id = '${key.KT_Id}') `;
            }
        }

        if (key.PH_Id && (key.DT_Id || key.KT_Id)) {
            query += `AND (ds.PH_Id = ${key.PH_Id}) `;
        } else {
            if (key.PH_Id) {
                query += `(ds.PH_Id = ${key.PH_Id}) `;
            }
        }
    }
    DanhSachPhongThiModel.getDanhSachPhongThi(
        query,
        (err, DanhSach) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(DanhSach);
            }
        }
    );
}

exports.addOne = (req, res) => {
    const reqData = new DanhSachPhongThiModel(req.body);
    reqData.DS_DeleteDate = '';
    DanhSachPhongThiModel.addOne(
        reqData,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Created successfully' });
            }
        }
    );
}

exports.addNew = (req, res) => {
    const info = req.body.info;
    const dsHocVien = req.body.dsHocVien;

    const sophong = Math.floor(dsHocVien.length / info.SoHocVien) + 1;
    let i = 0;
    let vt = 0;
    let count = 0;
    let j = 1;
    var data = [];

    for (j; j <= sophong; j++) {
        for (i; i < dsHocVien.length; i++) {
            data.push({
                HV_Id: dsHocVien[i].HV_Id,
                KT_Id: info.KT_Id,
                PH_Id: j,
                TGT_Id: info.TGT_Id
            });
            if (data.length % info.SoHocVien == 0) {
                vt = i;
                i = vt + 1;
                break;
            }
        }
    }
    DanhSachPhongThiModel.addNew(
        data,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Created successfully' });
            }
        }
    );
}

exports.deleteByHV = (req, res) => {

}