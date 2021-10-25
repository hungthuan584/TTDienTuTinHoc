var dbConnect = require('../db.config');

var CapBang = function (CapBang) {
    this.HV_Id = CapBang.HV_Id;
    this.VB_Id = CapBang.VB_Id;
    this.KQ_Id = CapBang.KQ_Id;
    this.CB_NgayCap = new Date();
    this.CB_IsConfirm = CapBang.CB_IsConfirm;
}

CapBang.getAll = (result) => {
    dbConnect.query(
        `
        SELECT *
        FROM CapBang cb
        JOIN VanBang vb ON vb.VB_Id = cb.VB_Id
        JOIN KetQuaThi kq ON kq.KQ_Id = cb.KQ_Id
        `,
        (err, res) => {
            if (err) {
                console.log('Error while fetching', err);
                result(null, err);
            } else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

CapBang.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO CapBang SET ?`,
        data,
        (err, res) => {
            if (err) {
                console.log('Error while creating', err);
                result(null, err);
            } else {
                console.log('Created successfully');
                result(null, res);
            }
        }
    );
}

module.exports = CapBang;