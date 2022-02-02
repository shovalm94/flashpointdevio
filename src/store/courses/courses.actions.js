import database from '../../middleware/firestore/courses'

export default {
  getCourses: ({commit,state}) => {
    let courses = [];
     database.read({path: 'courses'})
      .then((result) =>{
        result.docs.forEach(doc => {
          courses.push({data: doc.data(), id: doc.id})
      })
        commit('setCourses',courses)
      })
  },
  addStudents: ({commit, state}, item) => {
    database.create({path:'courses',id:item.id,uid:item.uid,user:item.user})

  }

}

