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
        :to="{path:`/settings/${userId}`}">
        <q-tooltip>Settings</q-tooltip>
      </q-btn>

      <q-btn
        class="q-mr-sm"
        dense
        flat
        icon="edit"
        round
        size="12px"
        :to="{path:`edit-profile/${userId}`}">
        <q-tooltip>Edit Profile</q-tooltip>
      </q-btn>

      <q-card-section class="text-center">
        <q-avatar size="100px" font-size="52px">
          <img
               :src=user.imgUrl
               alt="https://st.depositphotos.com/2101611/4338/v/950/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg"
          >
        </q-avatar>

        <q-item-section><br>
          <q-item-label class="text-bold">{{user.fullName}}</q-item-label>
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
            <q-item-label>{{user.email}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="grey" name="phone"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.phone }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="grey" name="bolt"/>
          </q-item-section>
            <q-item-label>A BLA BLA</q-item-label>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import firebaseInstance from "src/middleware/firebase";
import {mapState,mapMutations,mapActions} from "vuex";

export default {
  name: 'profile',
  data() {
    return {
      img: '',
    }
  },
computed: mapState('auth',['user','userId']),
  methods: {
    ...mapActions('auth',['getUser']),
    ...mapMutations('auth',['resetUser']),
    logout() {
      firebaseInstance.firebase.auth().signOut().then(() => {
        this.resetUser()
        this.$router.push('/login')
      })
        .catch((error) => {
          console.log(error, 'cannot logout')
        });
    }
  },
  created() {
    if(Object.keys(this.user).length === 0){
      this.getUser()
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
