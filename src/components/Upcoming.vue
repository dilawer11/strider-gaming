<template>
     <div id="games" class="large-margin container white">
            <a href="games.html"></a><!-- Nav Anchor -->
            <div class="row heading tiny-margin">
                <div class="col-md-auto">
                    <h1 class="animation-element slide-down white">UPCOMING <span class="colored">TOURNAMENTS</span></h1>
                </div>
                <div class="col">
                    <hr class="animation-element extend">
                </div>
            </div>
            <div class="row ">
                <div class="col-md-11 small-margin">
                   <!-- <p>Here at Strider games we pride ourselves in delivering rich and polished experiences that our fanbase can enjoy and immerse themselve into. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis rhoncus nibh.</p> -->
                </div>
                <div class="col-md-12">
                    <ul class="game-tags">
                        <li>Sort By GAME :</li>
                        <li><a href="#" data-filter=".fortnite" ref="FORTNITE">FORTNITE</a></li>
                        <li><a href="#" data-filter="*" ref="ALL">ALL</a></li>
                        <li><a href="#" data-filter=".pubg" ref="PUBG">PUBG</a></li>
                    </ul>
                </div>
            </div>
            <div class="games-portfolio ">
                <!-- Game Card -->
                <div v-for="(tournament,i) in upcomingTournaments" :key="i" class="row game-card fortnite white">
                    <div class="col-lg-12 col-xl-5 game-card-left">
                        <a :href="tournament.thumbnail" data-lightbox="screenshots_aurora">
                            <div class="overlay">
                                <i class="fa fa-picture-o fa-3x"></i>
                            </div>
                            <picture>
                                <source media="(min-width: 1200px)" :srcset="tournament.thumbnails">
                                <source media="(min-width: 768px)" :srcset="tournament.thumbnail">
                                <img src="images/placeholder.jpg" :data-src="tournament.thumbnail" class="img-fluid b-lazy" alt="aurora image">
                            </picture>
                        </a>
                        <!-- <a href="images/game1.1.jpg" data-lightbox="screenshots_aurora"></a>
                        <a href="images/game1.2.jpg" data-lightbox="screenshots_aurora"></a> -->
                    </div>
                    <div class="col-lg-12 col-xl-7 game-card-right">
                        <h2 class="short-hr-left white">{{tournament.name}}</h2>
                        <p class="tags"><span class="subtle">{{tournament.game}}</span> </p>
                        <p class="game-description">Classic Fortnite Friday. 2 teams of 2 people each join a squad match and highest total team elimination wins. First match will begin on 5pm sharp </p>
                        <div class="steam-btn">
                            <a data-toggle="modal" :data-target="'#game'+i" class="text-dark">
                                <i class="fa fa-plus-square fa-3x"></i>
                                <p>REGISTER <br>FOR IT!</p>
                            </a>
                            <!-- <span class="expand colored strong" data-toggle="modal" data-target="#game3">Read More</span> -->
                        </div>
                        <div class="reviews">
                            <a :href="tournament.ruleFile"><div class="score-card">
                                <p>Download Rules</p>
                            </div></a>
                            <!-- <a href="#"><div class="score-card">
                                <p>View Registered Teams</p>
                            </div></a> -->
                            <div class="score-card">
                                <p>{{tournament.date.getDate()}}/{{tournament.date.getMonth()}}/{{tournament.date.getFullYear()}}</p>
                            </div>
                            <div class="score-card">
                                <p>Entry: Rs.{{tournament.fee}}</p>
                            </div>
                        </div>
                    </div>
                 
                    <div class="modal fade game-modal" :id="'game'+i" tabindex="-1" role="dialog" aria-labelledby="aurora" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title white" id="aurora">TOURNAMENT REGISTER</h1>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                               <div class="modal-body">
                                    <TournamentRegister :key="i" :tournamentDetails="tournament" />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="button secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
</template>

<script>
import db from '@/firebase/init.js'
import firebase from 'firebase'
import TournamentRegister from '@/components/TournamentRegister.vue'
import { mapGetters, mapState } from 'vuex'
export default {
    name: 'Upcoming',
    components:{
        TournamentRegister,
    },
    data(){
        return {
            image: null
        }
    },
    created(){

    },
    computed:{
        ...mapState([
            'tournaments'
        ]),
        ...mapGetters([
            'upcomingTournaments'
        ]),
       
    },
 
    methods:{
      
    }
    
  

}
</script>

