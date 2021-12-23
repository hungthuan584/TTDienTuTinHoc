const HoaDonModel = require('../models/HoaDon.model');
const LopDaoTaoModel = require('../models/LopDaoTao.model');
const NhanVienModel = require('../models/NhanVien.model');
const ChungChiModel = require('../models/ChungChi.model');
const DangKyHocModel = require('../models/DangKyHoc.model');
const DangKyThiModel = require('../models/DangKyThi.model');
const TaiKhoanModel = require('../models/TaiKhoan.model');
const HocVienModel = require('../models/HocVien.model');

exports.getAll = (req, res) => {
    HoaDonModel.getAll(
        (err, HoaDon) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(HoaDon);
            }
        }
    );
}

exports.getByComplete = (req, res) => {
    HoaDonModel.getByComplete(
        (err, HoaDon) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(HoaDon);
            }
        }
    );
}

exports.getByInComplete = (req, res) => {
    HoaDonModel.getByInComplete(
        (err, HoaDon) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(HoaDon);
            }
        }
    );
}

exports.getByHocVien = (req, res) => {
    HoaDonModel.getByHocVien(
        req.params.hvId,
        (err, HoaDon) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(HoaDon);
            }
        }
    );
}

function makeId() {
    var id = new Date().getFullYear().toString().slice(2, 4) + (new Date().getMonth() + 1).toString() + new Date().getDate().toString() + new Date().getHours().toString() + new Date().getMinutes().toString() + new Date().getSeconds().toString();
    return id;
}

exports.getById = (req, res) => {
    HoaDonModel.getById(
        req.params.id,
        (err, HoaDon) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(HoaDon);
            }
        }
    );
}

exports.addLearn = (req, res) => {
    LopDaoTaoModel.getById(
        req.body.LH_Id.slice(0, 4),
        (err, LopDaoTao) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                if (!req.body.NV_Id) {
                    const HoaDonReqData = new HoaDonModel(req.body);
                    HoaDonReqData.HD_Id = makeId();
                    HoaDonReqData.HV_Id = req.params.hvId;
                    HoaDonReqData.HD_NoiDung = 'Đăng ký lớp ' + req.body.LH_Id + ' - ' + LopDaoTao.LDT_Ten;
                    if (!req.body.HV_Mssv) {
                        HoaDonReqData.HD_SoTien = LopDaoTao.LDT_LePhi;
                    } else {
                        HoaDonReqData.HD_SoTien = LopDaoTao.LDT_LePhiSinhVien;
                    }
                    HoaDonReqData.HD_CreateBy = 'ONLINE_WEBSITE';
                    HoaDonReqData.HD_IsComplete = 0;
                    HoaDonReqData.HD_IsDelete = 0;
                    HoaDonModel.addNew(
                        HoaDonReqData,
                        (err) => {
                            if (err) {
                                return res.json({ status: 0, message: err });
                            } else {
                                return res.json({ status: 1, message: 'Created successfully' });
                            }
                        }
                    );
                } else {
                    NhanVienModel.getById(
                        req.body.NV_Id,
                        (err, NhanVien) => {
                            if (err) {
                                return res.json({ status: 0, message: err });
                            } else {
                                const HoaDonReqData = new HoaDonModel(req.body);
                                HoaDonReqData.HD_Id = makeId();
                                HoaDonReqData.HV_Id = req.params.hvId;
                                HoaDonReqData.HD_NoiDung = 'Đăng ký lớp ' + req.body.LH_Id + ' - ' + LopDaoTao.LDT_Ten;
                                if (!req.body.HV_Mssv) {
                                    HoaDonReqData.HD_SoTien = LopDaoTao.LDT_LePhi;
                                } else {
                                    HoaDonReqData.HD_SoTien = LopDaoTao.LDT_LePhiSinhVien;
                                }
                                HoaDonReqData.HD_IsComplete = 0;
                                HoaDonReqData.HD_IsDelete = 0;
                                HoaDonReqData.HD_CreateBy = NhanVien.NV_Id + ' - ' + NhanVien.NV_HoTen;

                                HoaDonModel.addNew(
                                    HoaDonReqData,
                                    (err) => {
                                        if (err) {
                                            return res.json({ status: 0, message: err });
                                        } else {
                                            return res.json({ status: 1, message: 'Created successfully' });
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

exports.addExam = (req, res) => {

    ChungChiModel.getById(
        req.body.CC_Id,
        (err, ChungChi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                if (!req.body.NV_Id) {
                    const HoaDonReqData = new HoaDonModel(req.body);
                    HoaDonReqData.HD_Id = makeId();
                    HoaDonReqData.HV_Id = req.params.hvId;
                    HoaDonReqData.HD_NoiDung = 'Đăng ký thi ' + ChungChi.CC_Ten;
                    HoaDonReqData.HD_SoTien = ChungChi.CC_LePhi;
                    HoaDonReqData.HD_CreateBy = 'ONLINE_WEBSITE';
                    HoaDonReqData.HD_IsComplete = 0;
                    HoaDonReqData.HD_IsDelete = 0;
                    HoaDonModel.addNew(
                        HoaDonReqData,
                        (err) => {
                            if (err) {
                                return res.json({ status: 0, message: err });
                            } else {
                                return res.json({ status: 1, message: 'Created successfully' });
                            }
                        }
                    );
                } else {
                    NhanVienModel.getById(
                        req.body.NV_Id,
                        (err, NhanVien) => {
                            if (err) {
                                return res.json({ status: 0, message: err });
                            } else {
                                const HoaDonReqData = new HoaDonModel(req.body);
                                HoaDonReqData.HD_Id = makeId();
                                HoaDonReqData.HV_Id = req.params.hvId;
                                HoaDonReqData.HD_NoiDung = 'Đăng ký thi ' + ChungChi.CC_Ten;
                                HoaDonReqData.HD_SoTien = ChungChi.CC_LePhi;
                                HoaDonReqData.HD_IsComplete = 0;
                                HoaDonReqData.HD_IsDelete = 0;
                                HoaDonReqData.HD_CreateBy = NhanVien.NV_Id + ' - ' + NhanVien.NV_HoTen;

                                HoaDonModel.addNew(
                                    HoaDonReqData,
                                    (err) => {
                                        if (err) {
                                            return res.json({ status: 0, message: err });
                                        } else {
                                            return res.json({ status: 1, message: 'Created successfully' });
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

exports.confirmComplete = (req, res) => {
    HoaDonModel.confirmComplete(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Confirm Successfully' });
            }
        }
    );
}

exports.deleteById = (req, res) => {

    HoaDonModel.getById(
        req.params.id,
        (err, HoaDon) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                HoaDonModel.deleteById(
                    req.params.id,
                    (err) => {
                        if (err) {
                            return res.json({ status: 0, message: err });
                        } else {
                            DangKyHocModel.deleteByStudent(
                                HoaDon.HV_Id,
                                (err) => {
                                    if (err) {
                                        return res.json({ status: 0, message: err });
                                    } else {
                                        DangKyThiModel.deleteByHV(
                                            HoaDon.HV_Id,
                                            (err) => {
                                                if (err) {
                                                    return res.json({ status: 0, message: err });
                                                } else {
                                                    TaiKhoanModel.blockedByUsername(
                                                        HoaDon.HV_Id,
                                                        (err) => {
                                                            if (err) {
                                                                return res.json({ status: 0, message: err });
                                                            } else {
                                                                return res.json({ status: 1, message: 'Deleted successfully' });
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
}