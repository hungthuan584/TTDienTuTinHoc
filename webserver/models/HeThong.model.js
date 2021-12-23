const dbConnect = require('../db.config');

var HeThong = function (HeThong) {
    this.Ten = HeThong.Ten;
    this.Email = HeThong.Email;
    this.Password = HeThong.Password;
    this.DefaultPassword = HeThong.DefaultPassword;
    this.Sdt = HeThong.Sdt;
    this.DiaChi = HeThong.DiaChi;
    this.LinkFB = HeThong.LinkFB;
    this.Poster = HeThong.Poster;
    this.Logo = HeThong.Logo;
}

HeThong.getInfo = (result) => {
    dbConnect.query(
        `SELECT Ten, Email, Sdt, DiaChi, LinkFB, Poster, Logo FROM HeThong`,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected successfully');
                result(null, res[0]);
            }
        }
    );
}

HeThong.getConfig = (result) => {
    dbConnect.query(
        `SELECT * FROM HeThong`,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected successfully');
                result(null, res[0]);
            }
        }
    );
}

HeThong.updateSystem = (data, result) => {
    dbConnect.query(
        `UPDATE HeThong
        SET
            Ten = ?,
            Email = ?,
            Password = ?,
            DefaultPassword = ?,
            Sdt = ?,
            DiaChi = ?,
            LinkFB = ?
        `, [data.Ten, data.Email, data.Password, data.DefaultPassword, data.Sdt, data.DiaChi, data.LinkFB],
        (err, res) => {
            if (err) {
                console.log('Error while update', err);
                result(null, err);
            } else {
                console.log('Updated successfully');
                result(null, res);
            }
        }
    );
}

module.exports = HeThong;