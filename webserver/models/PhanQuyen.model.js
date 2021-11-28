const dbConnect = require('../db.config');

var PhanQuyen = function (PhanQuyen) {
    this.TK_TenDangNhap = PhanQuyen.TK_TenDangNhap;
    this.CN_Id = PhanQuyen.CN_Id;
}

PhanQuyen.getByUsername = (username, result) => {
    dbConnect.query(
        `SELECT * FROM PhanQuyen pq JOIN chucnang cn ON cn.CN_Id = pq.CN_Id WHERE TK_TenDangNhap = ?`,
        username,
        (err, res) => {
            if (err) {
                console.log('Error while checking');
                result(null, err);
            } else {
                console.log('Checked successfully');
                result(null, res);
            }
        }
    );
}

PhanQuyen.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO PhanQuyen SET ?`,
        data,
        (err, res) => {
            if (err) {
                console.log('Error while adding');
                result(null, err);
            } else {
                console.log('Added successfully');
                result(null, res);
            }
        }
    );
}

PhanQuyen.deleteByUsername = (username, id, result) => {
    dbConnect.query(
        `DELETE FROM PhanQuyen WHERE (TK_TenDangNhap = ?) AND (CN_Id = ?)`,
        [username, id],
        (err, res) => {
            if (err) {
                console.log('Error while deleting');
                result(null, err);
            } else {
                console.log('Deleted successfully');
                result(null, res);
            }
        }
    );
}

module.exports = PhanQuyen;