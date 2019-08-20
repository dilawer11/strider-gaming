<template>
  <div class="home">
    <MainNavbar/>
    <Hero/>
    <Upcoming/>
    <TopPlayers/>
    <Future/>
    <Contact/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'
import Upcoming from '@/components/Upcoming.vue'
import Future from '@/components/Future.vue'
import TopPlayers from '@/components/TopPlayers.vue'
import MainNavbar from '@/components/MainNavbar.vue'
import db from '@/firebase/init'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    MainNavbar,
    Hero,
    Contact,
    Footer,
    Upcoming,
    Future,
    TopPlayers,
  },
  created(){
    let dbTournaments = []
    db.collection('tournaments').get().then(snapshot => {
      snapshot.forEach(doc => {
        let temp = doc.data()
        temp.id = doc.id
        dbTournaments.push(temp);
      })
      this.setTournaments({tournaments: dbTournaments})
    })
    db.collection('users').get().then(snapshot => {
      let users = [];
      snapshot.forEach(doc=>{
        let temp = {}
        temp.epicID = doc.data().epicID;
        temp.id = doc.id;
        users.push(temp);
      })
      this.setUsers({users: users})
    })
  },
  computed:{
    ...mapState([
      'tournaments',

    ])
  },
  methods: {
    ...mapMutations([
      'setTournaments',
      'setUsers'
    ])
  },
  // beforeRouteEnter (to, from, next) {
  //   let dbTournaments = []
  //   db.collection('tournaments').get().then(snapshot => {
  //     snapshot.forEach(doc => {
  //       let temp = doc.data()
  //       temp.id = doc.id
  //       dbTournaments.push(temp);
  //     })
  //     next(vm => vm.setTournaments({tournaments: dbTournaments}))
  //   })
  // },
}
</script>

