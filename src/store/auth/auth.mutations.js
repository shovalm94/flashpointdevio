export default {

  setUser: ((state, user) => state.user = user),

  setUserStatus: ((state, online) => state.user.online = online),

  setUserId: ((state, id) => {
    state.userId = id
  }),

  setUserImage:((state,url)=> state.user.imgUrl=url),

  setUserCourses:((state,courses)=> state.userCourses=courses),

  resetUserId: ((state) => state.userId = ''),

  resetUser: ((state) => {state.user = {}}),

}



