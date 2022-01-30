<template>
  <q-layout>
    <q-page class="column">
      <q-card class="constrain text-center" flat>
        <q-card-section>
          <img src="../assets/flashdev.png" width="35%" alt="">
          <div class="text-subtitle2">flash{dev}point</div>
          <div class="text-subtitle2 text-primary">The next business generation</div>
        </q-card-section>
        <br>

        <q-tabs v-model="tab" class="text-primary">
          <q-tab label="Login" name="login"/>
          <q-tab label="Register" name="register"/>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <LoginTemplate/>
            <br>
            <GoogleLogin/>
            <br><br>
            <FacebookLogin/>
          </q-tab-panel>

          <q-tab-panel name="register">
            <RegisterTemplate/>
          </q-tab-panel>
        </q-tab-panels>
        <br><br><br>
      </q-card>
    </q-page>
  </q-layout>
</template>

<script>
import LoginTemplate from "components/LoginComp/LoginTemplate";
import GoogleLogin from "components/LoginComp/GoogleLogin";
import RegisterTemplate from "components/LoginComp/RegisterTemplate";
import FacebookLogin from "components/LoginComp/FacebookLogin";

export default {
  name: "Login",
  components: {FacebookLogin, RegisterTemplate, GoogleLogin, LoginTemplate},
  data() {
    return {
      tab: 'login'
    }
  },

  created() {
    if (window.user) {
      this.$router.push('/home');

    }
  }
}
</script>

<style lang="sass" scoped>
</style>
