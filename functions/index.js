const functions = require('firebase-functions');
const admin = require('firebase-admin')
const auth = require ('./auth')
const courses = require('./courses')
admin.initializeApp();

exports.userDeleted=auth.userDeleted;
exports.updateUserInCourse=courses.updateUserInCourse;
exports.deleteUserInCourse=courses.deleteUserInCourse;
exports.deleteUserInCourse=courses.deleteUserInCourse;




