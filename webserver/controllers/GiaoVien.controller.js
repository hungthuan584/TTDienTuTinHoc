const GiaoVienModel = require('../models/GiaoVien.model');
const TaiKhoanModel = require('../models/TaiKhoan.model');
const { genSaltSync, hashSync } = require('bcrypt');

exports.getAll = (req, res) => {
    GiaoVienModel.getAll(
        (err, GiaoVien) => {
            if (err) {
                return res.status(500).json({ status: 1, message: err });
            }
            return res.json(GiaoVien);
        }
    );
}

exports.getById = (req, res) => {
    GiaoVienModel.getById(
        req.params.id,
        (err, GiaoVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(GiaoVien);
        }
    );
}

exports.addNew = (req, res) => {
    GiaoVienModel.countNumber(
        (err, GiaoVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                var d = 0;
                var id = (new Date().getMonth() + 1).toString() + new Date().getFullYear().toString().slice(2, 4);
                h = false;

                if (GiaoVien) {
                    d = GiaoVien.length;
                }

                if (d < 9) {
                    h = true;
                    id += '00' + (d + 1).toString();
                } else {
                    if (d < 99) {
                        h = true;
                        id += '0' + (d + 1).toString();
                    } else {
                        if (d < 999) {
                            h = true;
                            id += (d + 1).toString();
                        }
                    }
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
                return res.json({ status: 1, message: 'Deleted successfully' });
            }
        }
    );
}