const express = require('express');
const route = express.Router();

const CourseController = require('../controllers/Course.controller');

// get all
route.get('/', CourseController.getAllCourse);

// get by id
route.get('/:course_id', CourseController.getCourseById);

// create
route.post('/',CourseController.createCourse);

// update
route.put('/:course_id',CourseController.updateCourseById);

// delete
route.delete('/:course_id',CourseController.deleteCourseById);

module.exports = route;