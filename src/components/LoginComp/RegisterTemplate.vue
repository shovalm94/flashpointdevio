<template>
  <q-form @submit.prevent.stop="onSubmit()">
    <q-input ref="fullName" v-model="localUser.fullName"
             :rules="[ val => val && val.length > 2 || 'Please type something']"
             label="Full name*"
             lazy-rules
             type="text"/>

    <q-input ref="email" v-model="localUser.email" :rules="[ val => val && val.length > 0 || 'Please enter your email']"
             label="Email*"
             lazy-rules
             type="email">
      <template v-slot:append>
        <q-icon name="mail"/>
      </template>
    </q-input>

    <q-input
      ref="phone"
      v-model="localUser.phone"
      :rules="[ val => val && val.length  === 10 || 'Please enter a valid phone number']"
      label="Phone*"
      lazy-rules
      mask="###-####-###"
      unmasked-value>
      <template v-slot:append>
        <q-icon name="phone"/>
      </template>
    </q-input>


    <q-input ref="password" v-model="localUser.password"
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

    <q-input ref="passwordRepeat" v-model="localUser.passwordRepeat"
             :rules="[ val => val === localUser.password || 'Passwords do not match']"
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
    <q-btn class="glossy" round color="secondary" icon="add_a_photo" size="md" @click="addImg=!addImg"/><br/>
    <q-input v-if="addImg" type="file" ref="fileInput" accept="image/*" @change="getFileData"/>

    <q-toggle v-model="accept" label="I accept the license and terms"/>
    <br>

    <q-btn class="text-primary" label="Sign me in!" outline type="submit"/>
  </q-form>
</template>

<script>
import firebaseInstance from '../../middleware/firebase'
import database from '../../middleware/firestore/auth'
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  name: "RegisterTemplate",

  data() {
    return {
      localUser: {
        fullName: ' ',
        email: '',
        password: '',
        passwordRepeat: '',
        phone: '',
      },
      isPwd: true,
      accept: false,
      addImg: false,
      fileData: '',
    }
  },
  computed: mapState('auth', ['user', 'userId']),

  methods: {
    ...mapActions('auth',['upload']),
    ...mapMutations('auth',['setUser',"setUserId"]),
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
        this.setUser({...this.localUser})
        firebaseInstance.firebase.auth().createUserWithEmailAndPassword(this.localUser.email, this.localUser.passwordRepeat)
          .then((res) => {
            window.user = res.user;
            this.setUserId(window.user.uid)
            database.createUser({path:'users',item:{...this.localUser},id:window.user.uid}).then(() => {
              this.uploadImage();
              this.$router.push('/home')
            })
          })
          .catch((err) => {
            console.log(err)
          });

      }
    },
    getFileData(e) {
      this.fileData = e.target.files[0];
    },
    uploadImage() {
      this.upload(this.fileData);
    }
  },

}
</script>

<style scoped>
</style>
