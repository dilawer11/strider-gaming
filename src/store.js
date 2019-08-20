import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDate : new Date(),
    topPlayers:{mostEliminations: 'EvE DeEleven', mostTournamentWins: 'TackledMonkey2', mostMatchesWon: 'Dr. Snipes', mostPoints:'NP Spam'},
    users : ['a','b','c','d'],
    // userProfile: {
    //   name: 'Dilawer Ahmed',
    //   accountBalance: 450,
    //   registeredTournaments:[{id:'1',paymentStatus:false, stats: {eliminations: 0, matchesWon: 0, placement: 0, points: 0, winnings: 0}},{id:'2',paymentStatus:true, stats:{ eliminations: 21, matchesWon: 10, placement: 2 , points: 160, winnings: 2000}}],
    //   epicID: 'D Eleven',
    //   tournamentsPlayed: 12,
    //   tournamentsWin: 2,
    //   eliminations: 50,
    //   matchesWon: 20,
    //   notifications: ['Payment Due For Tournament','Payment Made For Tournament'],
    // },
    userProfile:{},
    tournaments: [{
      name: 'Loading...',
      id: '1',
      fee: 0,
      game: 'Loading...',
      numberTeam: 1,
      description: 'Loading',
      date: new Date(),
      participants: [],
      ruleFile: '#',
      thumbnail: '#',
    },
    { 
      name: 'Loading...',
      id: '2',
      fee: 0,
      game: 'Loading...',
      numberTeam: 1,
      description: 'Loading...',
      date: new Date(),
      participants: [],
      ruleFile: '#',
      thumbnail: 'images/loading.jpeg',
    },
  
  ],
  // tournaments: [],
  },
  mutations: {
    setTournaments: (state,payload)=>{
      state.tournaments = payload.tournaments;
      state.tournaments.forEach(tournament => {
        tournament.date = new Date(tournament.date.seconds * 1000);
      })
    },
    registerTournament: (state,payload) => { 
      state.userProfile.registeredTournaments.push(payload.tournament);
    },
    setNewParticipants: (state,payload) => {
      state.tournaments.forEach(tournament => {
        if(tournament.id == payload.tournamentID){
          tournament.participants = payload.newParticipants;
        }
      })
    },
    setUserProfile: (state,payload) => {
      state.userProfile=payload.userProfile;
    },
    setUsers: (state,payload) => {
      state.users= payload.users;
    },
    setTopPlayers: (state, payload) => {
      state.topPlayers = payload.topPlayers;
    }
    
  },
  getters:{
    // registeredTournaments: state => {
    //   return state.tournaments.filter(tournament => state.userProfile.registeredTournaments.map(entry => {
    //     if(entry.id == tournament.id){
    //       tournament.stats = entry.stats;
    //       if(entry.paymentStatus==false){
    //         tournament.paymentStatus = 'Not Paid';
    //       } else{
    //         tournament.paymentStatus = 'Paid';
    //       }
    //       return tournament;
    //     }
    //   }));
    // },
    upcomingTournaments: state =>{
      return state.tournaments.filter(tournament => tournament.date >= state.currentDate);
    },
    tournamentsDone: state =>{
      return state.userProfile.registeredTournaments.filter(tournament => tournament.date < state.currentDate);
    },
    upcomingRegisteredTournaments: state =>{
      return state.userProfile.registeredTournaments.filter(tournament => tournament.date >= state.currentDate);
    },
  },
  actions: {

  }
})
