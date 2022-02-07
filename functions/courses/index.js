const functions = require('firebase-functions');
const admin = require('firebase-admin')

exports.updateUserInCourse =functions.firestore
  .document('/users/{userId}')
  .onUpdate((change, context) => {
    return admin.firestore().collection('users').doc(context.params.userId)
      .get()
      .then(doc => {
        const user = doc.data();
        return admin.firestore().collectionGroup('students').where('id','==',context.params.userId)
          .get().then((querySnapshot )=>{
            querySnapshot.forEach(snapshot=>{
              snapshot.ref.update(user)
            })
            })
      })
  })

















