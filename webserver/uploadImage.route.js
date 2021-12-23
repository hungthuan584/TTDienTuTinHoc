const express = require('express');
const route = express.Router();
const fs = require('fs');
const path = require('path');
const TaiKhoanModel = require('./models/TaiKhoan.model');

route.post('/', (req, res) => {

    // {
    //     "":"",
    //     "base64":"dlsakdhj'asd"
    // }

    TaiKhoanModel.getByUsername(
        req.body.user,
        (err, TaiKhoan) => {
            if (err) {
                return res.json({ status: 0, message: err });
            } else {
                var name = new Date().getDate().toString() + new Date().getMonth().toString() + new Date().getFullYear().toString() + `_${req.body.user}.png`;

                var filePath = `./files/avatars/${name}`;
                var buffer = Buffer.from(req.body.base64.split(',')[1], "base64");

                if (!TaiKhoan.TK_AnhDaiDien) {
                    fs.writeFileSync(path.join(__dirname, filePath), buffer);
                } else {
                    fs.unlink(
                        path.join(__dirname, `./files/avatars/${TaiKhoan.TK_AnhDaiDien}`),
                        (err) => {
                            if (err) {
                                return res.json({ status: 0, message: err });
                            } else {
                                fs.writeFileSync(path.join(__dirname, filePath), buffer);
                            }
                        }
                    );
                }

                TaiKhoanModel.changeAvatar(req.body.user, name, (err) => {
                    if (err) {
                        return res.json({ status: 0, message: err });
                    } else {
                        return res.json({ status: 1, message: 'Changed successfully' });
                    }
                });
            }
        }
    );
});

route.get('/:filename', (req, res) => {
    var filePath = path.join(__dirname, `./files/avatars/${req.params.filename}`);
    fs.exists(
        filePath,
        (check) => {
            if (check == true) {
                res.sendFile(filePath);
            } else {
                res.sendFile(path.join(__dirname, `./files/avatars/default_avatar.png`));
            }
        }
    );
});

module.exports = route;