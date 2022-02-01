<template>
  <q-page class="q-pa-md" >
    <q-card class="my-card" flat>

      <q-btn
        class="q-mr-sm"
        dense
        flat
        icon="keyboard_backspace"
        round
        size="12px"
        to="/settings">
        <q-tooltip>Back</q-tooltip>
      </q-btn>
      <q-card-section class="text-center">
        <q-icon name="delete" size="40px"></q-icon>
        <q-item-section><br>
          <q-item-label class="text-bold">Delete Account</q-item-label>
        </q-item-section>
      </q-card-section>
      <q-separator/>
      <br>

      <q-list>
        <q-item  clickable @click="openDialog=!openDialog">
          <q-item-section avatar>
            <q-item-label class="text-bold">Delete</q-item-label>
            <q-icon color="grey" name="delete"/>
          </q-item-section>
        </q-item>
      </q-list>
      <q-dialog v-model="openDialog">
        <q-card style="text-align: center;width: 25%">
          <q-card-section>
            <span class="text-h6">Message</span>
          </q-card-section>
          <q-card-section style="direction: ltr" class="q-pt-none">
           Once you delete your account , there's no getting it back.<br/>Make sure you want to do this.
          </q-card-section>
          <q-btn @click="deleteUser" flat label="Delete" color="primary" v-close-popup/>
          <q-btn style="margin:3px" label="Cancel" color="primary" v-close-popup/>

        </q-card>
      </q-dialog>
    </q-card>

  </q-page>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'delete-account',
  computed: mapState('auth', ['user', 'userId']),
  data() {
    return {
      openDialog: false,
    }
  },
  methods:{
    ...mapActions('auth',['delete']),
    deleteUser(){
      this.delete();
    }
  }

}
</script>
