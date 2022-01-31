import firebaseInstance from '../../middleware/firebase';

export default /* context */ {
  getCourses ({commit}){
    let courses = []
  firebaseInstance.db().collection('courses').get()
    .then(result => result.docs.forEach(doc => {
      courses.push(doc.data())
    }))
    commit('setCourses', courses)
}

}

