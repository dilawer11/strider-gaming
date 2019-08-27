<template>
    <div class="tournament-register">
     
        <div class="row h-100">
            <div class="col-sm-12">
                <div class="card text-center card-block mx-auto">
                <div v-if="userProfile.epicID" class="card-body">
                    
                
                    <form @submit.prevent="submitRegister()">
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-3 col-form-label text-dark">Tournament Name</label>
                            <div class="col-sm-9">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="tournamentDetails.name">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-3 col-form-label text-dark">Tournament Fee</label>
                            <div class="col-sm-9">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="tournamentDetails.fee + ' Per Player'">
                            </div>
                        </div>
                            <div class="form-group row">
                            <label for="staticEmail" class="col-sm-3 col-form-label text-dark">You</label>
                            <div class="col-sm-9">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="userProfile.epicID">
                            </div>
                        </div>
                        <div v-for="i in tournamentDetails.numberTeam-1" :key="i" class="form-group row">
                            <label for="staticEmail" class="col-sm-3 col-form-label text-dark">Partner {{i}}</label>
                            <div class="col-sm-9">
                            <!-- <input type="text" class="form-control-plaintext" id="staticEmail" placeholder="EpicID"> -->
                                <select class="form-control" data-size="5" v-model="players[i]">
                                    <option selected disabled> Pick a Partner </option>
                                    <option v-for="(user,j) in users" :key="j">{{user.epicID}}</option>
                                </select>

                            </div>
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="terms">
                            <label class="form-check-label text-dark" for="exampleCheck1">Agree to tournament rules</label>
                        </div>
                        <div v-if="feedback" class="p-3 mb-2 bg-danger text-white">{{feedback}}</div>
                        <div v-if="positiveFeedback" class="p-3 mb-2 bg-danger text-white">{{positiveFeedback}}</div>
                        <button type="submit" class="btn btn-primary colored">Confirm Register</button>
                    </form>
                </div>
                <div v-else class="card-body">
                    <h5 class="card-title text-dark">Please Login First</h5>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import validation from '@/jsfiles/validation.js'
import { userInfo } from 'os';
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: 'tournamentregister',
    props:{
        tournamentDetails: Object
    },
    data : () => ({
        players: [],
        currentIndex: 0,
        feedback: null,
        terms: false,
        user: null,
        positiveFeedback: null
    }),
    created(){
    },
    methods:{
        async submitRegister(){
            this.feedback = null;
            this.positiveFeedback = null;
            const snapshot = await db.collection('tournaments').get()
            if(snapshot.empty){
                this.feedback= 'No Upcoming Tournaments'
            }else{
                let dbTournaments = []
                snapshot.forEach(doc => {
                    let temp = doc.data();
                    temp.id = doc.id;
                    dbTournaments.push(temp);
                })
                this.setTournaments({tournaments: dbTournaments});
                this.players[0]=this.userProfile.epicID;           
                this.feedback = validation.validatePartners(this.tournamentDetails.numberTeam,this.players,this.tournamentDetails.participants,this.terms);
                if(!this.feedback){

                    let newParticipants = this.tournamentDetails.participants;
                    this.players.forEach(player => {
                        newParticipants.push(player)
                    })
                    let newTournament = this.makeUserTournament(this.tournamentDetails,this.players);
                    this.registerTournament({tournament: this.tournamentDetails, players: this.players})
                    this.setNewParticipants({tounamentID: this.tournamentDetails.id, newParticipants: newParticipants})
                    const tournamentUpdate = db.collection('tournaments').doc(this.tournamentDetails.id).update({
                        participants: this.tournamentDetails.participants
                    });
                    // const userProfileUpdate = db.collection('users').doc(firebase.auth().currentUser.uid).update({
                    //     registeredTournaments: this.userProfile.registeredTournaments
                    // });
                    // const bothCalls = [await tournamentUpdate, await userProfileUpdate];
                    this.registerAllTeam(this.players,newTournament);
                    const bothCalls = await tournamentUpdate
                    this.positiveFeedback = "Registration Sucessful" 
                }
            }                    
 
        },
        registerAllTeam(players,newTournament){
            let countDone = 0;
            this.players.forEach(player=>{
                this.users.forEach(user => {
                    if(user.epicID == player){
                        db.collection('users').doc(user.id).get().then(doc=>{
                            let temp = doc.data();
                            temp.registeredTournaments.push(newTournament)
                            db.collection('users').doc(user.id).update({
                                registeredTournaments : temp.registeredTournaments
                            }).then(resp=>{
                                countDone = countDone + 1;
                            }).catch(err=>{
                                this.feedback = err.message
                            })
                        }).catch(err=>{
                            this.feedback=err.message
                        })
                    }
                })
            })

           
        },
        makeUserTournament(tournament,players){ //TODO: Confirm these properties
            let userTournament = {}
            userTournament.name = tournament.name;
            userTournament.fee = tournament.fee;
            userTournament.stats = {};
            userTournament.paymentStatus = false;
            userTournament.date = tournament.date;
            userTournament.game = tournament.game;
            userTournament.team = players;
            return userTournament;
        },  
        ...mapMutations([
            'registerTournament',
            'setTournaments',
            'setNewParticipants'
        ])
    },
    computed:{
        ...mapState([
            'users',
            'userProfile'
        ]),
        userLoggedIn(){
            return firebase.auth().currentUser
        }
    }
 
}
</script>

<style>

</style>
