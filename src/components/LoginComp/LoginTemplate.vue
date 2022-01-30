<template>
  <div>
    <q-form @submit.prevent.stop="onLogin()">
      <q-input ref="email" v-model="email" :rules="[ val => val && val.length > 0 || 'Please enter your email',ValidEmail]"
               label="Email*"
               lazy-rules
               type="email">
        <template v-slot:append>
          <q-icon name="mail"/>
        </template>
      </q-input>
      <q-input ref="password" v-model="password"
               :rules="[ val => val && val.length > 6 || 'Please enter your password']"
               :type="isPwd ? 'password' : 'text'"
               label="Password*"
               lazy-rules>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-btn class="text-primary" icon="login" label="Login" outline type="submit"/>
    </q-form>
    <br>
    <div class="text-subtitle2">Forgot your password? <a href="#" @click="resetPassword()">click here</a>

    </div>

    <br>
  </div>
</template>

<script>
import firebaseInstance from '../../middleware/firebase'
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "LoginTemplate",
  data() {
    return {
      email: '',
      password: '',
      isPwd: true,
      resetPass:false,
    }
  },
  computed: mapState('auth', ['user', 'userId']),
  methods: {
    ...mapActions('auth',['getUser']),
    ...mapMutations('auth',['setUser',"setUserId"]),
    onLogin() {
      this.$refs.email.validate()
      this.$refs.password.validate()

      if (this.$refs.email.haseError || this.$refs.password.hasError) {
        this.formHasError = true
      } else if (this.formHasError === true) {
        console.log('something went wrong')
      } else {
        this.login();
      }
    },

    login() {
      if (this.formHasError !== true) {
        firebaseInstance.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            window.user = userCredential.user;
            this.setUserId(window.user.uid)
            this.getUser()
            this.$q.notify({
              type: 'positive',
              message: 'Welcome Back!'
            })
            this.$router.push('/home')
          })
          .catch((error) => {
            console.log(error)
            this.$q.notify({
              type: 'negative',
              message: 'One or more of the details you entered are incorrect. Please try again'
            })
          });
      }
    },
    ValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
    resetPassword(){
      this.$refs.email.validate()
      if(!this.$refs.email.hasError) {
        firebaseInstance.firebase.auth().sendPasswordResetEmail(this.email)
          .then(()=>{
            this.$q.notify({
              type: 'positive',
              message: 'check your mail and reset your password !'
            })
          })
      }
      else {
        this.$q.notify({
          type: 'negative',
          message: 'One or more of the details you entered are incorrect. Please try again'
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
