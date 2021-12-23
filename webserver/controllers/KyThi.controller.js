const KyThiModel = require('../models/KyThi.model');

exports.getAll = (req, res) => {
    KyThiModel.getAll(
        (err, KyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(KyThi);
            }
        }
    );
}

exports.getById = (req, res) => {
    KyThiModel.getById(
        req.params.id,
        (err, KyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(KyThi);
            }
        }
    );
}

exports.getByChungChi = (req, res) => {
    KyThiModel.getByCC(
        req.params.ccId,
        (err, KyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(KyThi);
            }
        }
    );
}

exports.getByDotThi = (req, res) => {
    KyThiModel.getByDT(
        req.params.dtId,
        (err, KyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(KyThi);
            }
        }
    );
}

exports.addNew = (req, res) => {

    KyThiModel.getByCC(
        req.body.CC_Id,
        (err, KyThi) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                console.log(KyThi);
                var d = 0;
                var id = "";
                if (KyThi.length != 0) {
                    d = KyThi.length;
                }

                id = req.body.CC_Id + (d + 1).toString();

                const KyThiReqData = new KyThiModel(req.body);
                KyThiReqData.KT_Id = id;
                KyThiReqData.KT_UpdateDate = '-  -     :  :';
                KyThiModel.addNew(
                    KyThiReqData,
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

exports.updateById = (req, res) => {
    const KyThiReqData = new KyThiModel(req.body);
    KyThiModel.updateById(
        req.params.id,
        KyThiReqData,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Updated successfully' });
            }
        }
    );
}