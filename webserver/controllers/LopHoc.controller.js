const LopHocModel = require('../models/LopHoc.model');


exports.getAll = (req, res) => {
    LopHocModel.getAll(
        (err, LopHoc) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(LopHoc);
            }
        }
    )
}

exports.getOpening = (req, res) => {
    LopHocModel.getOpening(
        (err, LopHoc) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(LopHoc);
            }
        }
    );
}

exports.getCompleted = (req, res) => {
    LopHocModel.getCompleted(
        (err, LopHoc) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(LopHoc);
            }
        }
    );
}

exports.getById = (req, res) => {
    LopHocModel.getById(
        req.params.id,
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
    const LopHocReqData = new LopHocModel(req.body);
    LopHocReqData.LH_UpdateDate = '-  -     :  :';
    LopHocReqData.LH_IsActive = 1;
    LopHocReqData.LH_IsComplete = 0;

    LopHocModel.getByPH(
        req.body.PH_Id,
        (err, PhongHoc) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                if (!PhongHoc) {
                    LopHocModel.countNumber(
                        LopHocReqData.LDT_Id,
                        (err, LopHoc) => {
                            if (err) {
                                return res.json({ status: 0, message: err });
                            } else {
                                var d = 0;
                                if (LopHoc) {
                                    d = LopHoc.length;
                                }

                                var id = LopHocReqData.LDT_Id + (d + 1).toString();

                                LopHocReqData.LH_Id = id;

                                if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
                                    return req.send(400).send({ status: 0, message: 'Please fill all fields' });
                                }
                                else {
                                    LopHocModel.addNew(
                                        LopHocReqData,
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
                        }
                    );
                } else {
                    return res.json({ status: 0, message: 'Trùng phòng học' });
                }
            }
        }
    );
}

exports.updateById = (req, res) => {
    const LopHocReqData = new LopHocModel(req.body);

    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        LopHocModel.updateById(
            req.params.id,
            LopHocReqData,
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

exports.deActivate = (req, res) => {
    LopHocModel.deActivate(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Deactivated successfully' });
            }
        }
    )
}
exports.activeRegister = (req, res) => {
    LopHocModel.activeRegister(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Actived successfully' });
            }
        }
    )
}

exports.isComplete = (req, res) => {
    LopHocModel.isComplete(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Checked Successfully' });
            }
        }
    );
}