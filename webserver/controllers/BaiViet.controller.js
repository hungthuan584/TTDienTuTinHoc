const BaiVietModel = require('../models/BaiViet.model');
const fs = require('fs');
const path = require('path');

exports.getNew = (req, res) => {
    BaiVietModel.getNew(
        (err, BaiViet) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(BaiViet);
            }
        }
    );
}

exports.getFile = (req, res) => {
    var filePath = path.join(__dirname, `../files/documents/${req.params.filename}`);
    fs.exists(
        filePath,
        (check) => {
            if (check == true) {
                res.sendFile(filePath);
            } else {
                return res.json({ status: 0, message: 'File không tồn tại' });
            }
        }
    )
}

exports.getAll = (req, res) => {
    BaiVietModel.getAll(
        (err, BaiViet) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(BaiViet);
            }
        }
    );
}

exports.getById = (req, res) => {
    BaiVietModel.getById(
        req.params.id,
        (err, BaiViet) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json(BaiViet);
            }
        }
    );
}

function saveFile(fileData) {
    var year = new Date().getFullYear().toString() + new Date().getMonth().toString() + new Date().getDate().toString();
    var name = year + '_' + fileData.name.replace(/\s/g, '');
    var filePath = `../files/documents/${name}`;
    var buffer = Buffer.from(fileData.base64.split(',')[1], "base64");
    fs.writeFileSync(path.join(__dirname, filePath), buffer);
    return name;
}

exports.addNew = (req, res) => {

    if (req.body.fileData) {

        var fileData = req.body.fileData;
        var formData = req.body.formData;

        var name = saveFile(fileData);

        const BaiVietReqData = new BaiVietModel(req.body);
        BaiVietReqData.BV_TieuDe = formData.BV_TieuDe;
        BaiVietReqData.BV_NoiDung = formData.BV_NoiDung;
        BaiVietReqData.BV_CreateBy = formData.BV_CreateBy;
        BaiVietReqData.BV_UploadFile = name;
        BaiVietReqData.BV_IsDelete = 0;
        BaiVietReqData.BV_UpdateDate = '-  -     :  :';
        BaiVietReqData.BV_DeleteDate = '-  -     :  :';

        BaiVietModel.addNew(
            BaiVietReqData,
            (err) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                } else {
                    return res.json({ status: 1, message: 'Created successfully' });
                }
            }
        );
    } else {
        const BaiVietReqData = new BaiVietModel(req.body);
        BaiVietReqData.BV_IsDelete = 0;
        BaiVietReqData.BV_UpdateDate = '-  -     :  :';
        BaiVietReqData.BV_DeleteDate = '-  -     :  :';

        BaiVietModel.addNew(
            BaiVietReqData,
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

exports.updateById = (req, res) => {

    if (req.body.fileData) {
        var fileData = req.body.fileData;
        var formData = req.body.formData;

        const BaiVietReqData = new BaiVietModel(req.body);

        BaiVietModel.getById(
            req.params.id,
            (err, BaiViet) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                } else {
                    if (!BaiViet.BV_UploadFile) {
                        var name = saveFile(fileData);
                        BaiVietReqData.BV_TieuDe = formData.BV_TieuDe;
                        BaiVietReqData.BV_NoiDung = formData.BV_NoiDung;
                        BaiVietReqData.BV_UploadFile = name;
                        BaiVietReqData.BV_UpdateBy = formData.BV_UpdateBy;
                        BaiVietModel.updateWithFile(
                            req.params.id,
                            BaiVietReqData,
                            (err) => {
                                if (err) {
                                    return res.json({ status: 0, message: err });
                                } else {
                                    return res.json({ status: 1, message: 'Updated successfully' });
                                }
                            }
                        );
                    } else {
                        oldFile = path.join(__dirname, `../files/documents/${BaiViet.BV_UploadFile}`);
                        fs.unlink(
                            oldFile,
                            (err) => {
                                if (err) {
                                    return res.json({ status: 0, message: err });
                                } else {
                                    var name = saveFile(fileData);

                                    BaiVietReqData.BV_TieuDe = formData.BV_TieuDe;
                                    BaiVietReqData.BV_NoiDung = formData.BV_NoiDung;
                                    BaiVietReqData.BV_UploadFile = name;
                                    BaiVietReqData.BV_UpdateBy = formData.BV_UpdateBy;
                                    BaiVietModel.updateWithFile(
                                        req.params.id,
                                        BaiVietReqData,
                                        (err) => {
                                            if (err) {
                                                return res.json({ status: 0, message: err });
                                            } else {
                                                return res.json({ status: 1, message: 'Updated successfully' });
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
    } else {
        const BaiVietReqData = new BaiVietModel(req.body);
        BaiVietModel.updateById(
            req.params.id,
            BaiVietReqData,
            (err) => {
                if (err) {
                    return res.json({ status: 0, message: err });
                } else {
                    return res.json({ status: 1, message: 'Updated successfully' });
                }
            }
        );
    }
}

exports.deleteById = (req, res) => {
    BaiVietModel.deleteById(
        req.params.id,
        (err) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                return res.json({ status: 1, message: 'Deleted successfully' });
            }
        }
    );
}