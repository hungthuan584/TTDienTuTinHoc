const GiangDayModel = require('../models/GiangDay.model');
const LopHocModel = require('../models/LopHoc.model');

exports.getAll = (req, res) => {
    GiangDayModel.getAll(
        (err, GiangDay) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(GiangDay);
            }
        }
    );
}

exports.getByGV = (req, res) => {
    GiangDayModel.getByGV(
        req.params.gvId,
        (err, GiangDay) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(GiangDay);
            }
        }
    );
}

exports.getByLH = (req, res) => {
    GiangDayModel.getByLH(
        req.params.lhId,
        (err, LopHoc) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(LopHoc);
            }
        }
    );
}

exports.addNew = (req, res) => {
    const GiangDayReqData = new GiangDayModel(req.body);
    GiangDayReqData.GD_UpdateDate = '-  -     :  :';
    GiangDayModel.getByGV(
        req.body.GV_Id,
        (err, GiaoVien) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                LopHocModel.getByInCompleteId(
                    req.body.LH_Id,
                    (err, LopHoc) => {
                        if (err) {
                            return res.json({ status: 0, message: err });
                        } else {
                            if (GiaoVien.length >= 2) {
                                return res.json({ status: 0, message: 'Trùng thời khoá biểu' });
                            } else {
                                if (GiaoVien.length == 0) {
                                    GiangDayModel.addNew(
                                        GiangDayReqData,
                                        (err) => {
                                            if (err) {
                                                return res.json({ status: 0, message: err });
                                            } else {
                                                return res.json({ status: 1, message: 'Created successfully' });
                                            }
                                        }
                                    );
                                } else {
                                    var h;
                                    switch (GiaoVien[0].TG_Id) {
                                        case 1:
                                            if (LopHoc.TG_Id == 4) {
                                                h = true;
                                            } else {
                                                h = false;
                                            }
                                            break;
                                        case 2:
                                            if (LopHoc.TG_Id == 3) {
                                                h = true;
                                            } else {
                                                h = false;
                                            }
                                            break;
                                        case 3:
                                            if (LopHoc.TG_Id == 2) {
                                                h = true;
                                            } else {
                                                h = false;
                                            }
                                            break;
                                        case 4:
                                            if (LopHoc.TG_Id == 1) {
                                                h = true;
                                            } else {
                                                h = false;
                                            }
                                    }

                                    if (h == true) {
                                        GiangDayModel.addNew(
                                            GiangDayReqData,
                                            (err) => {
                                                if (err) {
                                                    return res.json({ status: 0, message: err });
                                                } else {
                                                    return res.json({ status: 1, message: 'Created successfully' });
                                                }
                                            }
                                        );
                                    } else {
                                        return res.json({ status: 0, message: 'Trùng thời khoá biểu' });
                                    }
                                }
                            }
                        }
                    }
                );
            }
        }
    );
}

exports.updateByLH = (req, res) => {
    const GiangDayReqData = new GiangDayModel(req.body);
    GiangDayModel.getByGV(
        req.body.GV_Id,
        (err, GiaoVien) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                LopHocModel.getById(
                    req.params.LH_Id,
                    (err, LopHoc) => {
                        if (err) {
                            return res.json({ status: 0, message: err });
                        } else {
                            if (GiaoVien.length >= 2) {
                                return res.json({ status: 0, message: 'Trùng thời khoá biểu' });
                            } else {
                                if (GiaoVien.length == 0) {
                                    GiangDayModel.updateByLH(
                                        req.params.LH_Id,
                                        GiangDayReqData,
                                        (err) => {
                                            if (err) {
                                                return res.json({ status: 0, message: err });
                                            } else {
                                                return res.json({ status: 1, message: 'Created successfully' });
                                            }
                                        }
                                    );
                                } else {
                                    var h;
                                    switch (GiaoVien[0].TG_Id) {
                                        case 1:
                                            if (LopHoc.TG_Id == 4) {
                                                h = true;
                                            } else {
                                                h = false;
                                            }
                                            break;
                                        case 2:
                                            if (LopHoc.TG_Id == 3) {
                                                h = true;
                                            } else {
                                                h = false;
                                            }
                                            break;
                                        case 3:
                                            if (LopHoc.TG_Id == 2) {
                                                h = true;
                                            } else {
                                                h = false;
                                            }
                                            break;
                                        case 4:
                                            if (LopHoc.TG_Id == 1) {
                                                h = true;
                                            } else {
                                                h = false;
                                            }
                                    }

                                    if (h == true) {
                                        GiangDayModel.updateByLH(
                                            req.params.LH_Id,
                                            GiangDayReqData,
                                            (err) => {
                                                if (err) {
                                                    return res.json({ status: 0, message: err });
                                                } else {
                                                    return res.json({ status: 1, message: 'Updated successfully' });
                                                }
                                            }
                                        );
                                    } else {
                                        return res.json({ status: 0, message: 'Trùng thời khoá biểu' });
                                    }
                                }
                            }
                        }
                    }
                );
            }
        }
    );
}