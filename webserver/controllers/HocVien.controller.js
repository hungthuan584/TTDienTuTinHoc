const HocVienModel = require('../models/HocVien.model');
const TaiKhoanModel = require('../models/TaiKhoan.model');
const { genSaltSync, hashSync } = require('bcrypt');

// Danh sach hoc vien
exports.getAll = (req, res) => {

    HocVienModel.getAll(
        (err, HocVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(HocVien);
        }
    );
}

// Get hoc vien by Id
exports.getById = (req, res) => {

    HocVienModel.getHocVienById(
        req.params.id,
        (err, HocVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            }
            return res.json(HocVien);
        }
    );
}

// Them hoc vien
exports.addNew = (req, res) => {

    HocVienModel.countNumber(
        (err, HocVien) => {
            if (err) {
                return res.status(500).json({ status: 0, message: err });
            } else {
                var d = 0;
                var id = 'D';
                id += new Date().getFullYear().toString().slice(2, 4);;
                var h = false;
                if (HocVien) {
                    d = HocVien.length;
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

                    if (req.body.TK_XacThuc) {
                        TaiKhoanReqData.TK_XacThuc = 1;
                    } else {
                        TaiKhoanReqData.TK_XacThuc = 0;
                    }
                    TaiKhoanReqData.TK_TenDangNhap = id;
                    console.log('Pass: ', 'u$erCit' + new Date().getFullYear().toString());
                    TaiKhoanReqData.TK_MatKhau = hashSync('u$serCit' + new Date().getFullYear().toString(), salt);
                    TaiKhoanReqData.LV_Id = 4;
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
                                            }
                                            return res.json({ status: 1, info: HocVien, account: TaiKhoan });
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

// Sua
exports.updateById = (req, res) => {

    const HocVienReqData = new HocVienModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        HocVienModel.updateHocVien(
            req.params.id, HocVienReqData,
            (err) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                }
                return res.json({ status: 1, message: 'Updated Successfully' });
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
            }
            return res.json({ status: 1, message: 'Deleted Successfully' });
        }
    );
}