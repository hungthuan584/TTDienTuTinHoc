const CourseModel = require('../models/Course.model');

// Get All
exports.getAllCourse = (req, res) => {
    CourseModel.getAllCourse((err, Course) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json({ status: 1, massage: 'Selected Data Successfully!', data: Course });
    });
}

// Get By Id
exports.getCourseById = (req, res) => {
    CourseModel.getCourseById(req.params.course_id, (err, Course) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err });
        }
        return res.json({ status: 1, massage: 'Selected Data Successfully!', data: Course });
    });
}

// Create
exports.createCourse = (req, res) => {
    const CourseReqData = new CourseModel(req.body);
    CourseReqData.course_isDelete = 0;
    CourseReqData.course_deleteDate = '-  -     :  :';
    CourseReqData.course_updateDate = '-  -     :  :';
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, massage: 'Please fill all fields' });
    }
    else {
        CourseModel.createCourse(CourseReqData, (err, Course) => {
            if (err) {
                return res.json({ status: 0, massage: err });
            }
            return res.json({ status: 1, massage: 'Created Successfully', data: Course });
        });
    }
}

// Update
exports.updateCourseById = (req, res) => {
    const CourseReqData = new CourseModel(req.body);
    // Check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ success: false, massage: 'Please fill all fields' });
    } else {
        CourseModel.updateCourseById(req.params.course_id, CourseReqData, (err, Course) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Updated Successfully' });
        });
    }
}


// Delete
exports.deleteCourseById = (req, res) => {
    CourseModel.deleteCourseById(req.params.course_id, (err, Course) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Deleted Successfully' });
    });
}