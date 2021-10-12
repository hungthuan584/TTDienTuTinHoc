var dbConnect = require('../db.config');

var Course = function (Course) {
    this.course_name = Course.course_name;
    this.course_fee = Course.course_fee;
    this.course_createDate = new Date();
    this.course_updateDate = new Date();
    this.course_isDelete = Course.course_isDelete;
    this.course_deleteDate = new Date();
}

// Get all
Course.getAllCourse = (result) => {
    dbConnect.query(
        `SELECT * FROM course WHERE course_isDelete != 1`,
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
Course.getCourseById = (id, result) => {
    dbConnect.query(
        `SELECT * FROM course WHERE course_isDelete != 1 AND course_id = ${id}`,
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
Course.createCourse = (CourseReqData, result) => {
    dbConnect.query(
        `INSERT INTO course SET ? `,
        CourseReqData,
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
Course.updateCourseById = (id, CourseReqData, result) => {
    dbConnect.query(
        `UPDATE course SET course_name = ?, course_fee = ?, course_updateDate = current_timestamp() WHERE course_id = ?`,
        [
            CourseReqData.course_name,
            CourseReqData.course_fee,
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
Course.deleteCourseById = (id, result) => {
    dbConnect.query(
        `UPDATE Course SET course_isDelete = 1, course_deleteDate = current_timestamp() WHERE course_id = ${id}`,
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

module.exports = Course;