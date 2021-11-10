var dbConnect = require('../db.config');

var PhongHoc = function (PhongHoc) {
    this.PH_Id = PhongHoc.PH_Id;
    this.PH_Ten = PhongHoc.PH_Ten;
    this.PH_SucChua = PhongHoc.PH_SucChua;
    this.PH_IsDelete = PhongHoc.PH_IsDelete;
    this.PH_CreateDate = new Date();
    this.PH_UpdateDate = new Date();
    this.PH_DeleteDate = new Date();
}

// Get all
PhongHoc.getAll = (result) => {
    dbConnect.query(
        `SELECT * FROM PhongHoc WHERE PH_IsDelete != 1`,
        (err, res) => {
            if (err) {
                console.log('Error while selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

// Get by Id
PhongHoc.getById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM PhongHoc WHERE PH_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while selecting', err);
                result(null, err);
            }
            else {
                console.log('Selected successfully');
                result(null, res);
            }
        }
    );
}

PhongHoc.countNumber = (result) => {
    dbConnect.query(
        `SELECT * FROM PhongHoc`,
        (err, res) => {
            if (err) {
                console.log('Error counting', err);
                result(null, err);
            }
            else {
                console.log('Counted successfully');
                result(null, res);
            }
        }
    );
}

// Create
PhongHoc.addNew = (data, result) => {
    dbConnect.query(
        `INSERT INTO PhongHoc SET ? `,
        data,
        (err, res) => {
            if (err) {
                console.log('Error while creating', err);
                result(null, err);
            }
            else {
                console.log('Created successfully');
                result(null, res);
            }
        }
    );
}

// Update
PhongHoc.updateById = (id, data, result) => {
    dbConnect.query(
        `
        UPDATE PhongHoc
        SET
            PH_Ten = ?,
            PH_SucChua = ?,
            PH_UpdateDate = CURRENT_TIMESTAMP()
        WHERE PH_Id = ?`,
        [
            data.PH_Ten,
            data.PH_SucChua,
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error while updating');
                result(err, null);
            } else {
                console.log('Updated Successfully!');
                result(null, res);
            }
        }
    );
}

// Delete
PhongHoc.deleteById = (id, result) => {
    dbConnect.query(
        `
        UPDATE PhongHoc
        SET
            PH_IsDelete = 1,
            PH_DeleteDate = CURRENT_TIMESTAMP()
        WHERE PH_Id = ?`,
        id,
        (err, res) => {
            if (err) {
                console.log('Error while deleting');
                result(err, null);
            } else {
                console.log('Deleted successfully!');
                result(null, res)
            }
        }
    );
}

module.exports = PhongHoc;