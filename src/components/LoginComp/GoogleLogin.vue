<template>
  <q-btn class="text-primary" label="Login with Google" outline @click="loginWithGoogle()"/>
</template>

<script>
import firebaseInstance from '../../middleware/firebase'
import {mapState, mapActions, mapMutations} from "vuex";
import database from "src/middleware/firestore/auth";
export default {
  name: "GoogleLogin",
  computed: mapState('auth', ['user', 'userId']),
  methods: {
    ...mapActions('auth',['getUser']),
    ...mapMutations('auth',['setUser',"setUserId"]),
    loginWithGoogle() {
      const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      firebaseInstance.firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          window.user = result.user;
          this.setUserId(window.user.uid)
          if(result.additionalUserInfo.isNewUser) { // newUser
            const item={fullName:result.user.displayName,email:result.user.email}
            this.setUser(item);
            database.createUser({path: 'users', item, id: window.user.uid})
          }
          else{
            this.getUser()
          }
            this.$router.push('/home')
        }).catch((error) => {
        console.log('err',error)
      });

    }
  }
}
</script>

<style scoped>

</style>
