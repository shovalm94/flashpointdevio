<template>
  <div>
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <NavDesktop class="nav-desktop"></NavDesktop>
      <NavMobile class="nav-mobile"></NavMobile>

      <q-page-container class="constrain">
        <q-page>
          <router-view/>
        </q-page>
      </q-page-container>


    </q-layout>
  </div>
</template>
<script>
import NavDesktop from "components/Nav/NavDesktop";
import NavMobile from "components/Nav/NavMobile";

export default {
  components: {NavMobile, NavDesktop},
  created() {

  },
  data() {
    return {
    }
  },

}
</script>

<style lang="sass">
.main-layout
  height: 100%
  position: fixed


.chat-area
  overflow: hidden

.q-toolbar
  @media (min-width: $breakpoint-sm-min)
    height: 77px

.q-toolbar__title
  color: #f1ee00
  font-weight: 900
  font-size: 25px
  text-align: center
  @media (max-width: $breakpoint-xs-max)
    text-align: center

.q-footer
  .q-tab__icon
    font-size: 30px


@media screen and (max-width: 640px)
  .nav-mobile
    display: block !important
  .nav-desktop
    display: none


.nav-mobile
  display: none


.menu-item
  padding-left: 1.5em
  padding-right: 1.5em
  cursor: pointer
  color: #1F2532
  text-decoration: none

</style>
