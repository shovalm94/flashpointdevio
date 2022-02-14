import Vue from 'vue'
import Vuex from 'vuex'
import courses from './courses'
import auth from './auth'

Vue.use(Vuex)

  const Store = new Vuex.Store({
    modules: {
      courses,
      auth,
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  export default Store;

