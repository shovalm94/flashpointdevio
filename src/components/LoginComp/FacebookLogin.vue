<template>
  <q-btn label="Login with Facebook" outline class="text-primary" @click="loginWithFacebook()" icon="facebook
"/>

</template>
<script>
import firebaseInstance from '../../middleware/firebase'

export default {
  name: "FacebookLogin",
  methods: {
    loginWithFacebook() {

      const provider = new firebaseInstance.firebase.auth.FacebookAuthProvider();
      firebaseInstance.firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // The signed-in user info.
          var user = result.user;
          window.user = result.user;
          this.$router.push('/home')

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var accessToken = credential.accessToken;

          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(error)

          // ...
        });
    }
  }
}
</script>

<style scoped>

</style>
