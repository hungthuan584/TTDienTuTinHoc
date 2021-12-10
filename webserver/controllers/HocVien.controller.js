const HocVienModel = require('../models/HocVien.model');
const TaiKhoanModel = require('../models/TaiKhoan.model');
const DangKyHocModel = require('../models/DangKyHoc.model');
const { genSaltSync, hashSync } = require('bcrypt');

// Danh sach hoc vien
exports.getStudying = (req, res) => {

    HocVienModel.getStudying(
        (err, HocVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json(HocVien);
            }
        }
    );
}
exports.getStudyed = (req, res) => {

    HocVienModel.getStudyed(
        (err, HocVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json(HocVien);
            }
        }
    );
}

// Get hoc vien by Id
exports.getById = (req, res) => {

    HocVienModel.getById(
        req.params.id,
        (err, HocVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                HocVien.TK_MatKhau = undefined;
                return res.json(HocVien);
            }
        }
    );
}

function makeId(d) {

    if (d >= 9999) {
        return null;
    } else {
        var id = 'D';
        var year = new Date().getFullYear().toString().slice(2, 4);
        var str = (d + 1).toString();
        var num = '';
        if (d < 9) {
            num = '000' + str.toString();
        } else {
            if (d < 99) {
                num = '00' + str.toString();
            } else {
                if (d < 999) {
                    num = '0' + str.toString();
                } else {
                    num = str.toString();
                }
            }
        }
    }
    id += year += num;

    return id;
}

// Them hoc vien
exports.addNew = (req, res) => {
    DangKyHocModel.getByLopHoc(
        req.body.LH_Id,
        (err, LopHoc) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                if (LopHoc.length == 0 || LopHoc.length < LopHoc[0].LH_SiSo) {
                    HocVienModel.countNumber(
                        (err, HocVien) => {
                            if (err) {
                                return res.status(500).json({ status: 0, message: err });
                            } else {
                                var d = 0;
                                h = false;

                                if (HocVien) {
                                    d = HocVien.length;
                                }

                                var id = makeId(d);

                                if (id) {
                                    h = true;
                                } else {
                                    return res.status(500).json({ status: 0, message: 'Dữ liệu quá 9999 dòng' });
                                }

                                if (h == true) {
                                    const TaiKhoanReqData = new TaiKhoanModel(req.body);
                                    var password = 'u$erCit@' + new Date().getFullYear().toString();
                                    var salt = genSaltSync(10);
                                    TaiKhoanReqData.TK_MatKhau = hashSync(password, salt);
                                    TaiKhoanReqData.TK_XacThuc = 0;
                                    TaiKhoanReqData.TK_TenDangNhap = id;
                                    TaiKhoanReqData.TK_NumberOfLogin = 0;
                                    TaiKhoanReqData.Q_Id = 4;
                                    TaiKhoanReqData.TK_IsActive = 1;
                                    TaiKhoanReqData.TK_UpdateDate = '-  -     :  :';
                                    TaiKhoanReqData.TK_DeactivateDate = '-  -     :  :';

                                    TaiKhoanModel.addNew(
                                        TaiKhoanReqData,
                                        (err, TaiKhoan) => {
                                            if (err) {
                                                return res.json({ status: 0, message: err });
                                            } else {
                                                const HocVienReqData = new HocVienModel(req.body);

                                                HocVienReqData.HV_Id = id;
                                                HocVienReqData.TK_TenDangNhap = id;
                                                HocVienReqData.HV_IsDelete = 0;
                                                HocVienReqData.HV_UpdateDate = '-  -     :  :';
                                                HocVienReqData.HV_DeleteDate = '-  -     :  :';

                                                if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
                                                    return req.send(400).send({ status: 0, message: 'Please fill all fields' });
                                                }
                                                else {
                                                    HocVienModel.addNew(
                                                        HocVienReqData,
                                                        (err, HocVien) => {
                                                            if (err) {
                                                                return res.json({ status: 0, message: err });
                                                            } else {
                                                                const DangKyReqData = new DangKyHocModel(req.body);
                                                                DangKyReqData.LH_Id = req.body.LH_Id;

                                                                DangKyReqData.HV_Id = id;
                                                                DangKyHocModel.addNew(
                                                                    DangKyReqData,
                                                                    (err) => {
                                                                        if (err) {
                                                                            return res.status(500).json({ status: 0, message: err });
                                                                        } else {
                                                                            return res.json({ status: 1, message: 'Created successfully', username: id });
                                                                        }
                                                                    }
                                                                );
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        }
                                    );
                                }
                            }
                        }
                    );
                } else {
                    return res.json({ status: 0, message: 'Lớp đã đủ số lượng' });
                }
            }
        }
    );
}

// Sua
exports.updateById = (req, res) => {

    const HocVienReqData = new HocVienModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        HocVienModel.updateById(
            req.params.id,
            HocVienReqData,
            (err) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                } else {
                    return res.json({ status: 1, message: 'Updated Successfully' });
                }
            }
        );
    }
}

// Xoa
exports.deleteById = (req, res) => {
    HocVienModel.deleteHocVien(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Deleted Successfully' });
            }
        }
    );
}