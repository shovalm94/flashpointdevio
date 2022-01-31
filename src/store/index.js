import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
  paths:['courses', 'chapters', 'lessons']
})



import courses from './courses'
import chapters from './chapters'
import lessons from './lessons'
import auth from './auth'



// import users from './users'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */


export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
      courses,
      chapters,
      lessons,
      auth,
    },
plugins: [dataState]
// enable strict mode (adds overhead!)
// for dev mode only
//     strict: process.env.DEBUGGING
  })

  return Store;
}
