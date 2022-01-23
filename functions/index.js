const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp();


// >> WHEN A USER DELETES HIS ACCOUNT, THIS FUNCTION DELETES IT FROM
// >>         THE 'USERS' COLLECTION AS WELL.
exports.userDeleted = functions.auth.user().onDelete(user=> {
  const doc = admin.firestore().collection('users').doc(user.uid);
  return doc.delete();
})





