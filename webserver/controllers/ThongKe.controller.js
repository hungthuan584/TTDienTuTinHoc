const LopHocModel = require('../models/LopHoc.model');
const GiaoVienModel = require('../models/GiaoVien.model');
const HocVienModel = require('../models/HocVien.model');

exports.getByLopHoc = (req, res) => {
    const key = req.body;

    var data = 'WHERE ';

    if (!key.FromDay && !key.ToDay && !key.LDT_Id && !key.CC_Id && !key.PH_Id && !key.GV_Id && !key.TrangThai) {
        data = '';
    } else {

        if (key.FromDay && key.ToDay) {
            data += `(lh.LH_NgayKhaiGiang > '${key.FromDay}') AND (lh.LH_NgayKhaiGiang < '${key.ToDay}') `;
        } else {
            if (key.FromDay && !key.ToDay) {
                data += `(lh.LH_NgayKhaiGiang > '${key.FromDay}') `;
            } else {
                if (!key.FromDay && key.ToDay) {
                    data += `(lh.LH_NgayKhaiGiang < '${key.ToDay}') `;
                }
            }
        }

        if (key.LDT_Id && (key.FromDay || key.ToDay)) {
            data += `AND (lh.LDT_Id = '${key.LDT_Id}') `;
        } else {
            if (key.LDT_Id) {
                data += `(lh.LDT_Id = '${key.LDT_Id}') `;
            }
        }

        if (key.PH_Id && (key.LDT_Id || key.FromDay || key.ToDay)) {
            data += `AND (lh.PH_Id = ${key.PH_Id}) `;
        } else {
            if (key.PH_Id) {
                data += `(lh.PH_Id = ${key.PH_Id}) `;
            }
        }

        if (key.CC_Id && (key.PH_Id || key.LDT_Id || key.FromDay || key.ToDay)) {
            data += `AND (lh.LH_Id LIKE '%${key.CC_Id.slice(4, 6)}%') `;
        } else {
            if (key.CC_Id) {
                data += `(lh.LH_Id LIKE '%${key.CC_Id.slice(4, 6)}%') `;
            }
        }

        if (key.GV_Id && (key.CC_Id || key.PH_Id || key.LDT_Id || key.FromDay || key.ToDay)) {
            data += `AND (gd.GV_Id = '${key.GV_Id}') `;
        } else {
            if (key.GV_Id) {
                data += `(gd.GV_Id = '${key.GV_Id}')`;
            }
        }

        if (key.TrangThai && (key.GV_Id || key.CC_Id || key.PH_Id || key.LDT_Id || key.FromDay || key.ToDay)) {
            data += `AND (lh.LH_IsComplete = ${key.TrangThai}) `;
        } else {
            if (key.TrangThai) {
                data += `(lh.LH_IsComplete = ${key.TrangThai}) `;
            }
        }
    }
    console.log(data);

    LopHocModel.thongKe(
        data,
        (err, resData) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, data: resData });
            }
        }
    );
}

exports.getByHocVien = (req, res) => {
    const key = req.body;
    console.log(key);

    var data = 'WHERE ';
    if (!key.FromDay && !key.ToDay && !key.SinhVien && !key.HocPhi && !key.LDT_Id && !key.CC_Id && !key.KQ_DanhGia && !key.HocVien && !key.DKT_IsConfirm) {
        data = '';
        console.log('1');
    } else {
        console.log('2');
        if (key.FromDay && key.ToDay) {
            data += `((hv.HV_CreateDate > '${key.FromDay}') AND (hv.HV_CreateDate < '${key.ToDay}')) `
        } else {
            if (key.FromDay && !key.ToDay) {
                data += `(hv.HV_CreateDate > '${key.FromDay}') `
            } else {
                if (!key.FromDay && key.ToDay) {
                    data += `(hv.HV_CreateDate < '${key.ToDay}') `
                }
            }
        }

        if (key.SinhVien && (key.FromDay || key.ToDay)) {
            if (key.SinhVien == 1) {
                data += `AND (hv.HV_Mssv != '0') `;
            } else {
                data += `AND (hv.HV_Mssv = '0') `;
            }
        } else {
            if (key.SinhVien) {
                if (key.SinhVien == 1) {
                    data += `(hv.HV_Mssv != '0') `;
                } else {
                    data += `(hv.HV_Mssv = '0') `;
                }
            }
        }

        if (key.HocPhi && (key.SinhVien || key.FromDay || key.ToDay)) {
            data += `AND (hd.HD_IsComplete = ${key.HocPhi}) `;
        } else {
            if (key.HocPhi) {
                data += `(hd.HD_IsComplete = ${key.HocPhi}) `;
            }
        }

        if (key.LDT_Id && (key.HocPhi || key.SinhVien || key.FromDay || key.ToDay)) {
            data += `AND (lh.LDT_Id = '${key.LDT_Id}') `;
        } else {
            if (key.LDT_Id) {
                data += `(lh.LDT_Id = '${key.LDT_Id}') `;
            }
        }

        if (key.CC_Id && (key.LDT_Id || key.HocPhi || key.SinhVien || key.FromDay || key.ToDay)) {
            data += `AND (dkt.CC_Id = ${key.CC_Id}) `;
        } else {
            if (key.CC_Id) {
                data += `(dkt.CC_Id = ${key.CC_Id}) `;
            }
        }

        if (key.KQ_DanhGia && (key.CC_Id || key.LDT_Id || key.HocPhi || key.SinhVien || key.FromDay || key.ToDay)) {
            data += `AND (kq.KQ_DanhGia = ${key.KQ_DanhGia}) `;
        } else {
            if (key.KQ_DanhGia) {
                data += `(kq.KQ_DanhGia = ${key.KQ_DanhGia}) `;
            }
        }

        if (key.HocVien && (key.KQ_DanhGia || key.CC_Id || key.LDT_Id || key.HocPhi || key.SinhVien || key.FromDay || key.ToDay)) {
            if (key.HocVien == 1) {
                data += `AND (hv.HV_Id IN (SELECT HV_Id FROM DangKyHoc)) `;
            } else {
                data += `AND (hv.HV_Id NOT IN (SELECT HV_Id FROM DangKyHoc)) `;
            }
        } else {
            if (key.HocVien) {
                if (key.HocVien == 1) {
                    data += ` (hv.HV_Id IN (SELECT HV_Id FROM DangKyHoc)) `;
                } else {
                    data += ` (hv.HV_Id NOT IN (SELECT HV_Id FROM DangKyHoc)) `;
                }
            }
        }

        if (key.DKT_IsConfirm && (key.HocVien || key.KQ_DanhGia || key.CC_Id || key.LDT_Id || key.HocPhi || key.SinhVien || key.FromDay || key.ToDay)) {
            data += `AND (dkt.DKT_IsConfirm = ${key.DKT_IsConfirm}) `;
        } else {
            if (key.DKT_IsConfirm) {
                data += `(dkt.DKT_IsConfirm = ${key.DKT_IsConfirm}) `;
            }
        }
    }

    console.log(data);

    HocVienModel.thongKe(
        data,
        (err, resData) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, data: resData });
            }
        }
    );
}

exports.getByGiaoVien = (req, res) => {
    const key = req.body;

    var data = 'WHERE ';

    if (!key.FromDay && !key.ToDay && !key.CC_Id && !key.TG_Id && !key.TrinhDo) {
        data = '';
    } else {

        if (key.FromDay && key.ToDay) {
            data += `(lh.LH_NgayKhaiGiang > '${key.FromDay}') AND (lh.LH_NgayKhaiGiang < '${key.ToDay}') `;
        } else {
            if (key.FromDay && !key.ToDay) {
                data += `(lh.LH_NgayKhaiGiang > '${key.FromDay}') `;
            } else {
                if (!key.FromDay && key.ToDay) {
                    data += `(lh.LH_NgayKhaiGiang < '${key.ToDay}') `;
                }
            }
        }

        if (key.CC_Id && (key.FromDay || key.ToDay)) {

            data += `AND (gd.LH_Id LIKE '%${key.CC_Id.toString().slice(4, 6)}%') `;
        } else {
            if (key.CC_Id) {
                data += `(gd.LH_Id LIKE '%${key.CC_Id.toString().slice(4, 6)}%') `;
            }
        }

        if (key.TG_Id && (key.CC_Id || key.FromDay || key.ToDay)) {
            data += `AND (lh.TG_Id = ${key.TG_Id}) `;
        } else {
            if (key.TG_Id) {
                data += `(lh.TG_Id = ${key.TG_Id}) `;
            }
        }

        if (key.TrinhDo && (key.TG_Id || key.CC_Id || key.FromDay || key.ToDay)) {
            data += `AND (gv.GV_TrinhDo LIKE '${key.TrinhDo}%') `;
        } else {
            if (key.TrinhDo) {
                data += `(gv.GV_TrinhDo LIKE '${key.TrinhDo}%') `;
            }
        }
    }

    GiaoVienModel.thongKe(
        data,
        (err, resData) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, data: resData });
            }
        }
    );
}

exports.getByKhoaThi = (req, res) => {


}