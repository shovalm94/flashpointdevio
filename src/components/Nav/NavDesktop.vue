<template>
  <div>
    <q-header bordered class="bg-white" >

      <q-toolbar class="header-container">
        <div>
          <q-img class="logo" :src="require('../../assets/logos/Flashdev-Logo-Wide-By-JONNY.png')"/>
        </div>
        <div style="height: 100%; align-items: center;display: flex; flex-direction: row-reverse">

          <router-link
            class="menu-item"
            to="/profile/123456789"
            active-class=""
          >
          <div>
            <q-icon name="account_circle" size="28px"/>
            <div class="icon-text">פרופיל</div>
          </div>
          </router-link>

          <router-link
            class="menu-item"
            to=""
            active-class=""
          >
          <div>
            <q-icon name="chat_bubble_outline" size="28px"/>
            <div class="icon-text">צ'אט</div>
          </div>
          </router-link>
          <router-link
            class="menu-item"
            to='/school'
            active-class=""
          >
          <div>
            <q-icon name="grid_view" size="28px"/>
            <div class="icon-text">קורסים</div>
          </div>
          </router-link>
          <div @click="$router.push('/home')" class="menu-item">
            <q-icon name="home" size="28px"/>
            <div class="icon-text">ראשי</div>
          </div>
        </div>
      </q-toolbar>
    </q-header>

  </div>
</template>

<script>



export default {
  name: "NavDesktop",

}
</script>

<style scoped>

.header-container {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.logo {
  width: 162px;
  height: 34px
}

.profile-img:hover {
  background: #ddd;
}

.icon-text {
  color: #616161;
}


</style>
