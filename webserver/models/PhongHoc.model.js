var dbConnect = require('../db.config');

var PhongHoc = function (PhongHoc) {
    this.PH_Ten = PhongHoc.PH_Ten;
    this.PH_SucChua = PhongHoc.PH_SucChua;
    this.PH_CreateDate = new Date();
    this.PH_UpdateDate = new Date();
    this.PH_IsDelete = PhongHoc.PH_IsDelete;
    this.PH_DeleteDate = new Date();
}

// Get all
PhongHoc.getAllPhongHoc = (result) => {
    dbConnect.query(
        `SELECT * FROM phonghoc WHERE PH_IsDelete != 1`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Fetching Successfully');
                result(null, res);
            }
        }
    );
}

// Get by Id
PhongHoc.getPhongHocById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM phonghoc WHERE PH_IsDelete != 1 AND PH_Id = ${id}`,
        (err, res) => {
            if (err) {
                console.log('Error While Fetching', err);
                result(null, err);
            }
            else {
                console.log('Fetching Successfully');
                result(null, res);
            }
        }
    );
}

// Create
PhongHoc.addPhongHoc = (PhongHocReqData, result) => {
    dbConnect.query(
        `INSERT INTO phonghoc SET ? `,
        PhongHocReqData,
        (err, res) => {
            if (err) {
                console.log('Error While Creating New Data', err);
                result(null, err);
            }
            else {
                console.log('Data Created Successfully');
                result(null, res);
            }
        }
    );
}

// Update
PhongHoc.updatePhongHocById = (id, PhongHocReqData, result) => {
    dbConnect.query(
        `UPDATE phonghoc SET PH_Ten = ?, PH_SucChua = ?, PH_UpdateDate = CURRENT_TIMESTAMP() WHERE PH_Id = ?`,
        [
            PhongHocReqData.PH_Ten,
            PhongHocReqData.PH_SucChua,
            id
        ], (err, res) => {
            if (err) {
                console.log('Error While Updating Data');
                result(err, null);
            } else {
                console.log('Data Updated Successfully!');
                result(null, res);
            }
        });
}

// Delete
PhongHoc.deletePhongHocById = (id, result) => {
    dbConnect.query(
        `UPDATE phonghoc SET PH_IsDelete = 1, PH_DeleteDate = CURRENT_TIMESTAMP() WHERE PH_Id = ${id}`,
        (err, res) => {
            if (err) {
                console.log('Error While Deleting Data');
                result(err, null);
            } else {
                console.log('Data Deleted Successfully!');
                result(null, res)
            }
        }
    );
}

module.exports = PhongHoc;