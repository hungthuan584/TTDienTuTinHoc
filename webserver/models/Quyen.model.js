const dbConnect = require('../db.config');

var Quyen = function (Quyen) {
    this.Q_Ten = Quyen.Q_Ten;
    this.Q_CreateDate = Quyen.Q_CreateDate;
}

Quyen.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM Quyen`,
        (err, res) => {
            if (err) {
                console.log('Error while select');
                result(null, err);
            } else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

Quyen.getById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM Quyen WHERE Q_Id = ?`,
        id,
        (err, res) => {
            (err, res) => {
                if (err) {
                    console.log('Error while select');
                    result(null, err);
                } else {
                    console.log('Selected successfully');
                    result(null, res);
                }
            }
        }
    );
}