const functions = require('firebase-functions');
const admin = require('firebase-admin')
const auth = require ('./auth')
admin.initializeApp();

exports.userDeleted=auth.userDeleted;




