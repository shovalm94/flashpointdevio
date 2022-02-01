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
        :to="{path:`profile/settings/${userId}`}">
        <q-tooltip>Back</q-tooltip>
      </q-btn>

      <q-card-section class="text-center">
     <q-icon name="aod" size="40px"></q-icon>

        <q-item-section><br>
          <q-item-label class="text-bold">Display</q-item-label>
        </q-item-section>
      </q-card-section>

      <q-separator /><br>

      <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="grey" name="nights_stay" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Dark mood</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="grey" name="language" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Hebrew</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

    </q-card>
  </q-page>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'display',
  computed: mapState('auth', ['user', 'userId']),
  data() {
    return {}
  }
}
</script>
