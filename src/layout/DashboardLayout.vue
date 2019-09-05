<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Strider Gaming"
      title="Strider Gaming"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-warning',
            path: '/dashboard'
          }"
        />

       
        <sidebar-item :link="{name: 'User Profile', icon: 'ni ni-single-02 text-warning', path: '/profile'}"/>
        <sidebar-item :link="{name: 'Tournaments', icon: 'ni ni-bullet-list-67 text-warning', path: '/tournaments'}"/>
        <sidebar-item :link="{name: 'Add Game', icon: 'ni ni-key-25 text-warning', path: '/addgame'}"/>
        <!--<sidebar-item :link="{name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/> -->

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';
  import store from '../store'

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'orange' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    },
    beforeRouteEnter(to,from,next){
      if(store.state.userProfile){
        next()
      }
    },
 
  };
</script>
<style lang="scss">
</style>
