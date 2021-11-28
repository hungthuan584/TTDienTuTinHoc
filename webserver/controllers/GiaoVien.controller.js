const GiaoVienModel = require('../models/GiaoVien.model');
const TaiKhoanModel = require('../models/TaiKhoan.model');
const { genSaltSync, hashSync } = require('bcrypt');

exports.getAll = (req, res) => {
    GiaoVienModel.getAll(
        (err, GiaoVien) => {
            if (err) {
                return res.status(500).json({ status: 1, message: err });
            } else {
                GiaoVien.TK_MatKhau = undefined;
                return res.json(GiaoVien);
            }
        }
    );
}

exports.getById = (req, res) => {
    GiaoVienModel.getById(
        req.params.id,
        (err, GiaoVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                GiaoVien.TK_MatKhau = undefined;
                return res.json(GiaoVien);
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
                return res.status(500).json({ status: 0, message: err });
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
                    return res.status(500).json({ status: 0, message: 'Dữ liệu quá 9999 dòng' });
                }

                if (h == true) {
                    const TaiKhoanReqData = new TaiKhoanModel(req.body);
                    var salt = genSaltSync(10);

                    TaiKhoanReqData.TK_TenDangNhap = id;
                    TaiKhoanReqData.TK_MatKhau = hashSync('u$erCit@' + new Date().getFullYear().toString(), salt);
                    TaiKhoanReqData.Q_Id = 3;
                    TaiKhoanReqData.TK_XacThuc = 1;
                    TaiKhoanReqData.TK_IsActive = 1;
                    TaiKhoanReqData.TK_UpdateDate = '-  -     :  :';
                    TaiKhoanReqData.TK_DeactivateDate = '-  -     :  :';

                    TaiKhoanModel.addNew(
                        TaiKhoanReqData,
                        (err) => {
                            if (err) {
                                return res.status(500).json({ status: 0, message: err });
                            } else {
                                const GiaoVienReqData = new GiaoVienModel(req.body);

                                GiaoVienReqData.GV_Id = id;
                                GiaoVienReqData.TK_TenDangNhap = id;
                                GiaoVienReqData.GV_IsDelete = 0;
                                GiaoVienReqData.GV_UpdateDate = '-  -     :  :';
                                GiaoVienReqData.GV_DeleteDate = '-  -     :  :';

                                if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
                                    return req.send(400).send({ status: 0, message: 'Nhập đầy đủ tất cả các trường' });
                                } else {
                                    GiaoVienModel.addNew(
                                        GiaoVienReqData,
                                        (err) => {
                                            if (err) {
                                                return res.status(500).json({ status: 0, message: err });
                                            } else {
                                                return res.json({ status: 1, message: 'Thêm thành công' });
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

exports.updateById = (req, res) => {
    const GiaoVienReqData = new GiaoVienModel(req.body);

    GiaoVienModel.updateById(
        req.params.id,
        GiaoVienReqData,
        (err) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Updated successfully' });
            }
        }
    );
}

exports.deleteById = (req, res) => {
    GiaoVienModel.deleteById(
        req.params.id,
        (err) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                TaiKhoanModel.blockedByUsername(
                    req.params.id,
                    (err) => {
                        if (err) {
                            return res.status(500).json({ status: 0, message: err });
                        } else {
                            return res.json({ status: 1, message: 'Deleted successfully' });
                        }
                    }
                );
            }
        }
    );
}