<template>
  <div class="home">
    
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

export default {
  name: 'home',
  components: {
    Hero,
    Contact,
    Footer,
    Upcoming,
    Future,
    TopPlayers,
  }
}
</script>
