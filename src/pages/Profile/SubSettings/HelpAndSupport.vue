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
        to="/settings">
        <q-tooltip>Back</q-tooltip>
      </q-btn>

      <q-card-section class="text-center">
     <q-icon name="help" size="40px"></q-icon>

        <q-item-section><br>
          <q-item-label class="text-bold">Help and Support</q-item-label>
        </q-item-section>
      </q-card-section>

      <q-separator /><br>

      <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="grey" name="aod" />
          </q-item-section>
        </q-item>
      </q-list>

    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'help-and-support',
  data() {
    return {}
  }
}
</script>
