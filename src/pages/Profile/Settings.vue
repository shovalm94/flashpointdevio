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
     <q-icon name="settings" size="40px"></q-icon>

        <q-item-section><br>
          <q-item-label class="text-bold">Settings Page</q-item-label>
        </q-item-section>
      </q-card-section>

      <q-separator /><br>

      <q-list>
        <q-item to="/display" clickable>
          <q-item-section avatar>
            <q-icon color="grey" name="aod" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Display</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/push-notifications" clickable>
          <q-item-section avatar>
            <q-icon color="grey" name="circle_notifications" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Push Notifications</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/privacy-and-security" clickable>
          <q-item-section avatar>
            <q-icon color="grey" name="lock" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Privacy and Security</q-item-label>
          </q-item-section>
        </q-item>


        <q-item :to="{path:`/delete-account/${userId}`}" clickable>
          <q-item-section avatar>
            <q-icon color="grey" name="delete" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Delete Account</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/help-and-support" clickable>
          <q-item-section avatar>
            <q-icon color="grey" name="help" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Help and Support</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/app-info" clickable>
          <q-item-section avatar>
            <q-icon color="grey" name="offline_bolt"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>App info</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

  </q-page>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'settings',
  computed: mapState('auth', ['user', 'userId']),
  data() {
    return {

    }
  }
}
</script>
