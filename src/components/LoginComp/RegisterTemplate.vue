<template>
  <q-form @submit.prevent.stop="onSubmit()">
    <q-input ref="fullName" v-model="fullName"
             :rules="[ val => val && val.length > 4 || 'Please type something']"
             label="Full name*"
             lazy-rules
             type="text"/>

    <q-input ref="email" v-model="email" :rules="[ val => val && val.length > 0 || 'Please enter your email']"
             label="Email*"
             lazy-rules
             type="email">
      <template v-slot:append>
        <q-icon name="mail"/>
      </template>
    </q-input>

    <q-input
      ref="phone"
      v-model="phone"
      :rules="[ val => val && val.length  === 10 || 'Please enter a valid phone number']"
      label="Phone*"
      lazy-rules
      mask="###-####-###"
      unmasked-value>
      <template v-slot:append>
        <q-icon name="phone"/>
      </template>
    </q-input>


    <q-input ref="password" v-model="password"
             :rules="[ val => val && val.length > 0 || 'Please type something']"
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


    <q-input ref="passwordRepeat" v-model="passwordRepeat"
             :rules="[ val => val === password || 'Passwords do not match']"
             :type="isPwd ? 'password' : 'text'"
             label="Repeat password*"
             lazy-rules>

      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-toggle v-model="accept" label="I accept the license and terms"/>
    <br>

    <q-btn class="text-primary" label="Sign me in!" outline type="submit"/>
  </q-form>
</template>

<script>
import firebaseInstance from '../../middleware/firebase'

export default {
  name: "RegisterTemplate",

  data() {
    return {

      fullName: ' ',
      email: '',
      password: '',
      passwordRepeat: '',
      phone: '',
      isPwd: true,
      accept: false,
    }
  },

  methods: {
    onSubmit() {
      this.$refs.fullName.validate()
      this.$refs.email.validate()
      this.$refs.password.validate()
      this.$refs.passwordRepeat.validate()
      this.$refs.phone.validate()

      if (this.$refs.fullName.hasError || this.$refs.email.hasError ||
        this.$refs.password.hasError || this.$refs.passwordRepeat.hasError || this.$refs.phone.hasError) {
        this.formHasError = true
      } else if (this.accept !== true) {
        this.$q.notify({
          color: 'negative',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted',
        })
        this.register();
      }
    },

    register() {
      if (this.accept === true) {
        firebaseInstance.firebase.auth().createUserWithEmailAndPassword(this.email, this.passwordRepeat)
          .then((userCredential) => {
            var user = userCredential.user;
            this.$router.push('/home')
          })
          .catch(() => {
            console.log('something went wrong')
          });
      }
    },
  },
}
</script>

<style scoped>
</style>
