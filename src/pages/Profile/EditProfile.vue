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
        to="/profile">
        <q-tooltip>Back</q-tooltip>
      </q-btn>


      <q-card-section class="text-center">
        <q-avatar font-size="52px" size="100px" @click="">
          <img v-if="img"
               alt="https://st.depositphotos.com/2101611/4338/v/950/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg"
               src="../../assets/flashdev.png"
          >
        </q-avatar>

        <q-item-section><br>
          <q-item-label class="text-bold">Sara Katz</q-item-label>
          <q-item-label caption>
            ערוך פרופיל
          </q-item-label>
        </q-item-section>
      </q-card-section>

      <q-separator/><br>

      <q-form>
        <q-input v-model="fullName" label="Full name" type="text"/>

        <q-input v-model="address" label="Address" type="text">
          <template v-slot:append>
            <q-icon name="place"/>
          </template>
        </q-input>

        <q-input ref="email" v-model="email" label="Email" type="email">
          <template v-slot:append>
            <q-icon name="mail"/>
          </template>
        </q-input>

        <q-input v-model="phone" label="Phone Number" type="phone">
          <template v-slot:append>
            <q-icon name="phone"/>
          </template>
        </q-input>

        <q-input ref="status" v-model="status" label="Status" type="text">
          <template v-slot:append>
            <q-icon name="bolt"/>
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


export default {
  name: 'edit-profile',
  data() {
    return {
      fullName: '',
      email: '',
      address: '',
      phone: '',
      status: '',
      img: ''
    }
  },
  methods: {

    update() {

    },

    click1() {
      this.$refs.input1.click()
    },

    previewImage(event) {
      const self = this
      self.uploadValue = 0;
      self.profilePicture = null;
      self.imageData = event.target.files[0];
      this.onUpload()
    },

    onUpload() {

    },

  },
}
</script>
<style lang="sass" scoped>

</style>
