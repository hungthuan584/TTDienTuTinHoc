const KetQuaThiModel = require('../models/KetQuaThi.model');
const ChungChiModel = require('../models/ChungChi.model');

exports.getInfo = (req, res) => {
    KetQuaThiModel.getInfo(
        req.params.hvId, req.params.ktId,
        (err, KetQua) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(KetQua);
            }
        }
    );
}

exports.addMulti = (req, res) => {

    ChungChiModel.getById(
        req.body.KT_Id.slice(0, 6),
        (err, ChungChi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                const dsHocVien = req.body.dsHocVien;
                let data = [];
                for (let i = 0; i < dsHocVien.length; i++) {
                    let danhgia;
                    if ((dsHocVien[i].KQ_LyThuyet + dsHocVien[i].KQ_ThucHanh) / 2 >= ChungChi.CC_DiemChuan) {
                        danhgia = 1;
                    } else {
                        danhgia = 0;
                    }

                    data.push({
                        HV_Id: dsHocVien[i].HV_Id,
                        KT_Id: req.body.KT_Id,
                        KQ_LyThuyet: dsHocVien[i].KQ_LyThuyet,
                        KQ_ThucHanh: dsHocVien[i].KQ_ThucHanh,
                        KQ_DanhGia: danhgia,
                        KQ_IsDelete: 0
                    });
                }

                let query = '';
                for (let i = 0; i < data.length; i++) {
                    if (i == data.length - 1) {
                        query += `('${data[i].HV_Id}','${data[i].KT_Id}',${data[i].KQ_LyThuyet},${data[i].KQ_ThucHanh},${data[i].KQ_DanhGia},${data[i].KQ_IsDelete});`
                    } else {
                        query += `('${data[i].HV_Id}','${data[i].KT_Id}',${data[i].KQ_LyThuyet},${data[i].KQ_ThucHanh},${data[i].KQ_DanhGia},${data[i].KQ_IsDelete}),`
                    }
                }

                KetQuaThiModel.addNew(
                    query,
                    (err) => {
                        if (err) {
                            return res.json({ status: 0, message: err });
                        } else {
                            return res.json({ status: 1, message: 'Created successfully' });
                        }
                    }
                )
            }
        }
    );

}

exports.addNew = (req, res) => {
    ChungChiModel.getById(
        req.body.KT_Id.slice(0, 6),
        (err, ChungChi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                const data = req.body;
                let query = `('${data.HV_Id}', '${data.KT_Id}',${data.KQ_LyThuyet}, ${data.KQ_ThucHanh},`;

                if ((parseFloat(req.body.KQ_LyThuyet) + parseFloat(req.body.KQ_ThucHanh)) / 2 < ChungChi.CC_DiemChuan) {
                    query += `0, 0);`;
                } else {
                    query += `1, 0);`;
                }

                console.log(query);
                KetQuaThiModel.addNew(
                    query,
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

exports.getByHocVien = (req, res) => {
    const data = req.body;
    var query = `WHERE (kq.HV_Id = '${data.HV_Id}') AND (kq.KT_Id = '${data.KT_Id}') AND (kt.KT_NgayThi = '${data.KT_NgayThi}')`;
    KetQuaThiModel.searchByUser(
        query,
        (err, KetQua) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(KetQua);
            }
        }
    );
}

exports.searchByUser = (req, res) => {

}

exports.updateByHV = (req, res) => {
    ChungChiModel.getById(
        req.params.ktId.slice(0, 6),
        (err, ChungChi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                const KetQuaThiReqData = new KetQuaThiModel(req.body);
                if ((parseFloat(req.body.KQ_LyThuyet) + parseFloat(req.body.KQ_ThucHanh)) / 2 < ChungChi.CC_DiemChuan) {
                    KetQuaThiReqData.KQ_DanhGia = 0;
                } else {
                    KetQuaThiReqData.KQ_DanhGia = 1;
                }

                KetQuaThiModel.updateByHocVien(
                    req.params.hvId,
                    req.params.ktId,
                    KetQuaThiReqData,
                    (err) => {
                        if (err) {
                            return res.json({ status: 0, message: err });
                        } else {
                            return res.json({ status: 1, message: 'Updated successfully' });
                        }
                    }
                )
            }
        }
    )
}

exports.getDanhSachDiem = (req, res) => {

}