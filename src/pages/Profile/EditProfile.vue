<template>
  <q-page class="q-pa-md">
    <q-card class="my-card" flat>
      <q-btn
        class="q-mr-sm"
        dense
        flat
        icon="keyboard_backspace"
        round
        size="12px"
        @click="$router.back()">
        <q-tooltip>Back</q-tooltip>
      </q-btn>

      <q-card-section class="text-center">
        <q-avatar font-size="52px" size="100px" @click="">
          <img :src=editedUser.imgUrl
               alt="https://st.depositphotos.com/2101611/4338/v/950/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg"
               >
          <q-btn class="q-mr-sm" style="position: absolute;color:gray"
            dense
            flat
            icon="edit"
            round
            size="12px"
          @click="editImg=!editImg">
            <q-tooltip>Edit image</q-tooltip>
          </q-btn>
        </q-avatar>
        <q-input v-if="editImg" type="file" ref="fileInput" accept="image/*" @change="getFileData"/>
        <q-btn v-if="editImg" flat color="primary" label="Upload" @click="updateImage"/>

        <q-item-section><br>
          <q-item-label class="text-bold">{{ editedUser.fullName }}</q-item-label>
          <q-item-label caption>
            ערוך פרופיל
          </q-item-label>
        </q-item-section>
      </q-card-section>
      <q-separator/>
      <br>

      <q-form>

        <q-input v-model="editedUser.fullName" label="Full name" type="text"/>

        <q-input ref="email" v-model="editedUser.email" label="Email" type="email"
                 :rules="[ val => val && val.length > 0|| 'Please enter your email',ValidEmail]"
                 lazy-rules
        >
          <template v-slot:append>
            <q-icon name="mail"/>
          </template>
        </q-input>

        <q-input v-model="editedUser.phone" label="Phone Number" type="phone"
                 :rules="[ val => val && val.length  === 10 || 'Please enter a valid phone number']">
          <template v-slot:append>
            <q-icon name="phone"/>
          </template>
        </q-input>
        <br>
        <div class="text-center">
          <q-btn @click="update" class="text-primary" label="Save changes" outline/>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>
<script>

import {mapActions, mapState} from "vuex";

export default {
  name: 'edit-profile',
  computed: mapState('auth', ['user', 'userId']),

  data() {
    return {
      editedUser: {
        fullName: '',
        email: '',
        phone: '',
        imgUrl:''
      },
      editImg: false,
      fileData:''
    }
  },
  methods: {
    ...mapActions('auth', ['updateUser','upload']),
    update() {
      if (this.$refs.email.hasError === true) {
        this.formHasError = true
      } else if (this.formHasError === true) {
        console.log('something went wrong')
      } else {
        this.updateUser({...this.editedUser})
        this.$router.go(-1)
      }
    },
    getFileData(e) {
      this.fileData = e.target.files[0];
    },
    updateImage(){
      this.upload(this.fileData)
    },
    ValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
  },
  created() {
    this.editedUser ={...this.user}
  }
}
</script>
<style lang="sass" scoped>

</style>
