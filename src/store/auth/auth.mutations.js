export default {

  setUser: ((state, user) => state.user = user),

  setUserStatus: ((state, online) => state.user.online = online),

  setUserId: ((state, id) => state.userId = id),

  resetUserId: ((state) => state.userId = ''),

  resetUser: ((state) => {state.user = {}}),

}



