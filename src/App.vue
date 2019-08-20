<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
import db from '@/firebase/init'
import { mapMutations, mapState } from 'vuex'
import firebase from 'firebase/app'
export default {
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        db.collection('users').doc(user.uid).get().then(doc=>{
          let userProfile = doc.data();
          userProfile.uid = doc.id;
          this.setUserProfile({userProfile: userProfile})
        })
      }
    })
  },
  methods: {
    ...mapMutations([
      'setUserProfile'
    ])
  }
}
</script>


<style>
</style>
