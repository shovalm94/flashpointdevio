<template>
  <div>
    <q-footer class="bg-white footer">
      <q-toolbar class="footer-wrapper">
        <div class="menu-icon">
          <q-icon name="account_circle" size="24px"/>
          <div>פרופיל</div>
        </div>
        <div class="menu-icon">
          <q-icon name="chat_bubble_outline" size="24px"/>
          <div>צ'אט</div>
        </div>
        <div class="menu-icon">
          <q-icon name="grid_view" size="24px"/>
          <div class="header-icon">קורסים</div>
        </div>
        <div class="menu-icon">
          <q-icon name="home" size="24px"/>
          <div>ראשי</div>
        </div>
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script>
export default {
  name: "NavMobile"
}
</script>

<style scoped>

.footer-wrapper {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
}

.footer {
  position: fixed;
}


</style>
