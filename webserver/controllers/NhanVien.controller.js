const NhanVienModel = require('../models/NhanVien.model');
const TaiKhoanModel = require('../models/TaiKhoan.model');
const { genSaltSync, hashSync } = require('bcrypt');
const HeThongModel = require('../models/HeThong.model');

exports.getAll = (req, res) => {
    NhanVienModel.getAll(
        (err, NhanVien) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                NhanVien.TK_MatKhau = undefined;
                return res.json(NhanVien);
            }
        }
    );
}

exports.getById = (req, res) => {
    NhanVienModel.getById(
        req.params.id,
        (err, NhanVien) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                // NhanVien.TK_MatKhau = undefined;
                return res.json(NhanVien);
            }
        }
    );
}

function makeId(d) {
    if (d >= 9999) {
        return null;
    } else {
        var dau = "";
        var cuoi = "";
        var id = "";
        var year = new Date().getFullYear().toString().slice(2, 4);

        str = (d + 1).toString();

        if (str.length <= 2) {
            dau = '00';
            if (d < 9) {
                cuoi = '0' + (d + 1).toString();
            } else {
                cuoi = (d + 1).toString();
            }
        } else {
            numDau = Number(str.substring(0, str.length - 2));
            numCuoi = Number(str.slice(str.length - 2, str.length));
            if (numDau < 9) {
                dau = '0' + numDau.toString();
            } else {
                dau = numDau.toString();
            }

            if (numCuoi < 9) {
                cuoi = '0' + numCuoi.toString();
            } else {
                cuoi = numCuoi.toString();
            }
        }

        id = dau + year + cuoi;

        return id;
    }
}

exports.addNew = (req, res) => {

    TaiKhoanModel.countNumber(
        (err, TaiKhoan) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                var d = 0;
                h = false;

                if (TaiKhoan) {
                    d = TaiKhoan.length;
                }

                var id = makeId(d);
                if (id) {
                    h = true;
                } else {
                    return res.json({ status: 0, message: 'D??? li???u qu?? 9999 d??ng' });
                }

                if (h == true) {
                    HeThongModel.getConfig(
                        (err, HeThong) => {
                            if (err) {
                                return res.json({ status: 0, message: err });
                            } else {
                                const TaiKhoanReqData = new TaiKhoanModel(req.body);
                                var salt = genSaltSync(10);
                                var password = HeThong.DefaultPassword;

                                TaiKhoanReqData.TK_TenDangNhap = id;
                                TaiKhoanReqData.TK_MatKhau = hashSync(password, salt);
                                if (req.body.CV_Id == 1) {
                                    TaiKhoanReqData.Q_Id = 1;
                                } else {
                                    TaiKhoanReqData.Q_Id = 2;
                                }
                                TaiKhoanReqData.TK_NumberOfLogin = 0;
                                TaiKhoanReqData.TK_IsActive = 1;
                                TaiKhoanReqData.TK_UpdateDate = '-  -     :  :';

                                TaiKhoanModel.addNew(
                                    TaiKhoanReqData,
                                    (err) => {
                                        if (err) {
                                            return res.json({ status: 0, message: err });
                                        } else {
                                            const NhanVienReqData = new NhanVienModel(req.body);

                                            NhanVienReqData.NV_Id = id;
                                            NhanVienReqData.TK_TenDangNhap = id;
                                            NhanVienReqData.NV_IsDelete = 0;
                                            NhanVienReqData.NV_UpdateDate = '-  -     :  :';

                                            if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
                                                return req.send(400).send({ status: 0, message: 'Nh???p ?????y ????? t???t c??? c??c tr?????ng' });
                                            } else {
                                                NhanVienModel.addNew(
                                                    NhanVienReqData,
                                                    (err) => {
                                                        if (err) {
                                                            return res.json({ status: 0, message: err });
                                                        } else {
                                                            return res.json({ status: 1, message: 'Th??m th??nh c??ng' });
                                                        }
                                                    }
                                                );
                                            }
                                        }
                                    }
                                );
                            }
                        }
                    )
                }
            }
        }
    );
}

exports.updateById = (req, res) => {
    const data = new NhanVienModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        if (req.body.CV_Id != 1) {
            TaiKhoanModel.changeRole(
                req.params.id,
                2,
                (err) => {
                    if (err) {
                        return res.json({ status: 0, message: err });
                    } else {
                        NhanVienModel.updateById(
                            req.params.id,
                            data,
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
            );
        }
    }
}

exports.changeInfo = (req, res) => {

    const NhanVienReqData = new NhanVienModel(req.body);
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        NhanVienModel.changeInfo(
            req.params.id,
            NhanVienReqData,
            (err) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                } else {
                    return res.json({ status: 1, message: 'Changed successfully' });
                }
            }
        );
    }
}

exports.deleteById = (req, res) => {
    NhanVienModel.deleteById(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Deleted Successfully' });
        }
    );
}