<template>
  <q-page class="q-pa-md">

    <q-card class="my-card" flat>

      <q-btn
        class="q-mr-sm"
        dense
        flat
        icon="logout"
        round
        size="12px"
        @click="logout()">
        <q-tooltip>Logout</q-tooltip>
      </q-btn>

      <q-btn
        class="q-mr-sm"
        dense
        flat
        icon="settings"
        round
        size="12px"
        to="/settings">
        <q-tooltip>Settings</q-tooltip>
      </q-btn>

      <q-btn
        class="q-mr-sm"
        dense
        flat
        icon="edit"
        round
        size="12px"
        to="/edit-profile">
        <q-tooltip>Edit Profile</q-tooltip>
      </q-btn>

      <q-card-section class="text-center">

        <q-avatar size="100px" font-size="52px">
          <img v-if="img"
               src="../../assets/flashdev.png"
               alt="https://st.depositphotos.com/2101611/4338/v/950/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg"
          >
        </q-avatar>

        <q-item-section><br>
          <q-item-label class="text-bold">Sara Katz</q-item-label>
          <q-item-label caption>
            {Tel-aviv, Israel
          </q-item-label>
        </q-item-section>
      </q-card-section>

      <q-separator/>
      <br>

      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon color="grey" name="email"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>sara@gmail.com</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="grey" name="phone"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>053-676-6565</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="grey" name="bolt"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>A BLA BLA</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>


    </q-card>

  </q-page>
</template>

<script>
import firebaseInstance from "src/middleware/firebase";

export default {
  name: 'profile',
  data() {
    return {
      img: ''
    }
  },

  methods: {
    logout() {
      firebaseInstance.firebase.auth().signOut().then(() => {
        this.$router.push('/login')
      })
        .catch((error) => {
          console.log(error, 'cannot logout')
        });
    }
  },


}
</script>
<style lang="sass" scoped>

</style>
