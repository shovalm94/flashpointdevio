const functions = require('firebase-functions');
const admin = require('firebase-admin')


admin.initializeApp();

exports.userDeleted = functions.auth.user().onDelete(user => {
  const doc = admin.firestore().collection('users').doc(user.uid);
  return doc.delete().then(()=>{
    const bucket = admin.storage().bucket();
    return bucket.deleteFiles({
      prefix: `profiles/${user.uid}`,
    })
  })
})






