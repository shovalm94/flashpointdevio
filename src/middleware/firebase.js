import firebase from "firebase/app";
import storage from "firebase/storage";
import auth from "firebase/auth";
import ft from "firebase/firestore/";
const authentication = () => {
  return firebase.auth();
};
/** Convenience method to initialize firebase app
 *
 * @param  {Object} config
 * @return {Object} App
 */
const fBInit = config => {
  return firebase.initializeApp(config);
};
const db = () => {
  return firebase.firestore()
};


export default {
  authentication,
  fBInit,
  firebase,
  db
};
