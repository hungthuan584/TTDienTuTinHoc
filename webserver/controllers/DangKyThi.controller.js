const DangKyThiModel = require('../models/DangKyThi.model');
const HocVienModel = require('../models/HocVien.model');
const TaiKhoanModel = require('../models/TaiKhoan.model');
const { genSaltSync, hashSync } = require('bcrypt');
const HeThongModel = require('../models/HeThong.model');
const DotThiModel = require('../models/DotThi.model');

exports.getByDotThi = (req, res) => {
    DangKyThiModel.getByDotThi(
        req.params.dtId,
        (err, DangKyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(DangKyThi);
            }
        }
    );
}

exports.getByHocVien = (req, res) => {
    DangKyThiModel.getByHocVien(
        req.params.hvId,
        (err, DangKyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(DangKyThi);
            }
        }
    );
}

exports.getByChungChi = (req, res) => {
    DangKyThiModel.getByChungChi(
        req.params.ccId,
        (err, DangKyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(DangKyThi);
            }
        }
    );
}

function makeId(d) {

    if (d >= 9999) {
        return null;
    } else {
        var id = '';
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

exports.getAllHocVienDuThi = (req, res) => {
    DangKyThiModel.getHocVienDuThi(
        req.params.dtId, '',
        (err, HocVien) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(HocVien);
            }
        }
    );
}


exports.getHocVienDuThiByCC = (req, res) => {
    var query = `AND (dk.CC_Id = '${req.params.ccId}')`
    DangKyThiModel.getHocVienDuThi(
        req.params.dtId, query,
        (err, HocVien) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(HocVien);
            }
        }
    );
}

exports.addNew = (req, res) => {
    HocVienModel.countNumber(
        (err, HocVien) => {
            if (err) {
                return res.json({ status: 0, message: err });
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
                    return res.json({ status: 0, message: 'Dữ liệu quá 9999 dòng' });
                }

                if (h == true) {
                    HeThongModel.getConfig(
                        (err, HeThong) => {
                            if (err) {
                                return res.json({ status: 0, message: err });
                            } else {
                                const TaiKhoanReqData = new TaiKhoanModel(req.body);
                                var password = HeThong.DefaultPassword;
                                var salt = genSaltSync(10);

                                TaiKhoanReqData.TK_MatKhau = hashSync(password, salt);
                                TaiKhoanReqData.TK_TenDangNhap = id;
                                TaiKhoanReqData.TK_NumberOfLogin = 0;
                                TaiKhoanReqData.Q_Id = 4;
                                TaiKhoanReqData.TK_IsActive = 1;
                                TaiKhoanReqData.TK_UpdateDate = '-  -     :  :';

                                TaiKhoanModel.addNew(
                                    TaiKhoanReqData,
                                    (err, TaiKhoan) => {
                                        if (err) {
                                            return res.json({ status: 0, message: err });
                                        } else {
                                            const HocVienReqData = new HocVienModel(req.body);

                                            HocVienReqData.HV_Id = id;
                                            HocVienReqData.TK_TenDangNhap = id;
                                            if (!req.body.HV_Mssv) {
                                                HocVienReqData.HV_Mssv = '0';
                                            } else {
                                                HocVienReqData.HV_Mssv = req.body.HV_Mssv;
                                            }
                                            HocVienReqData.HV_IsDelete = 0;
                                            HocVienReqData.HV_UpdateDate = '-  -     :  :';

                                            if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
                                                return req.send(400).send({ status: 0, message: 'Please fill all fields' });
                                            }
                                            else {
                                                HocVienModel.addNew(
                                                    HocVienReqData,
                                                    (err) => {
                                                        if (err) {
                                                            return res.json({ status: 0, message: err });
                                                        } else {
                                                            if (!req.body.DT_Id) {
                                                                DotThiModel.getCurrent(
                                                                    (err, DotThi) => {
                                                                        if (err) {
                                                                            return res.json({ status: 0, message: err });
                                                                        } else {
                                                                            const DangKyReqData = new DangKyThiModel(req.body);
                                                                            DangKyReqData.DT_Id = DotThi.DT_Id;
                                                                            DangKyReqData.CC_Id = req.body.CC_Id;

                                                                            if (!req.body.DKT_Module) {
                                                                                DangKyReqData.DKT_Module = 'IU1,IU2,IU3,IU4,IU5,IU6';
                                                                            }

                                                                            DangKyReqData.HV_Id = id;
                                                                            DangKyThiModel.addNew(
                                                                                DangKyReqData,
                                                                                (err) => {
                                                                                    if (err) {
                                                                                        return res.json({ status: 0, message: err });
                                                                                    } else {
                                                                                        return res.json({ status: 1, message: 'Created successfully', username: id });
                                                                                    }
                                                                                }
                                                                            );
                                                                        }
                                                                    }
                                                                );
                                                            } else {
                                                                const DangKyReqData = new DangKyThiModel(req.body);
                                                                DangKyReqData.CC_Id = req.body.CC_Id;

                                                                if (!req.body.DKT_Module) {
                                                                    DangKyReqData.DKT_Module = '';
                                                                }

                                                                DangKyReqData.HV_Id = id;
                                                                DangKyThiModel.addNew(
                                                                    DangKyReqData,
                                                                    (err) => {
                                                                        if (err) {
                                                                            return res.json({ status: 0, message: err });
                                                                        } else {
                                                                            return res.json({ status: 1, message: 'Created successfully', username: id });
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
                            }
                        }
                    );
                }
            }
        }
    );
}

exports.addMultiple = (req, res) => {
    DangKyThiModel.addMultiple(
        req.body,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Created successfully' });
            }
        }
    )
}

exports.deleteByHV = (req, res) => {
    DangKyThiModel.deleteByHV(
        req.params.hvId,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Deleted successfully' });
            }
        }
    );
}

exports.confirmByHV = (req, res) => {
    DangKyThiModel.confirmByHV(
        req.params.hvId,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Confirmed successfully' });
            }
        }
    );
}

exports.confirmAuto = (req, res) => {
    const dsHV = req.body;

    for (let i = 0; i < dsHV.length; i++) {
        DangKyThiModel.confirmByHV(
            dsHV[i],
            (err) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
            }
        );
    }

    return res.json({ status: 1, message: 'Confirmed successfully' });
}