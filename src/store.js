import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDate : new Date(),
    topPlayers:{mostEliminations: 'FaTe_PinzeR & FaTe_Weezyy', mostTournamentWins: 'EvE Oxcy & P4PA ON 144Hz', mostMatchesWon: 'EvE Oxcy & P4PA ON 144Hz', mostPoints:'Undecided'},
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
    rankPerks: [
      {
        rank:0,
        title: 'Bush Noob',
        perks:[],
        rankUpRequirements:{
          points: 50,
          matchesWon: 5,
          tournamentsWon: 1,
          tournamentsPlayed: 2,
        }
      },
      {
        rank:1,
        title: 'Bob The Builder',
        rankUpRequirements:{
          points: 100,
          matchesWon: 10,
          tournamentsWon: 2,
          tournamentsPlayed: 4,
        },
        perks:[
          {
            name: '10% increase in Winnings',
            category: 'winning',
            value: 0.1,
          },
          {
            name: '10% reduction in Entry Fees',
            category: 'entry',
            value: -0.1,
          }
        ]
      },
      {
        rank:2,
        title: 'Ooga Booga Ops',
        rankUpRequirements:{
          points: 150,
          matchesWon: 15,
          tournamentsWon: 3,
          tournamentsPlayed: 6,
        },
        perks:[
          {
            name : '20% reduction in Entry Fees',
            category: 'entry',
            value: -0.2,
          },
          {
            name: 'Unlock Aplha Tournaments',
            category: 'special',
            value: 'alpha-unlock',
          }
        ]
      },
      {
        rank:3,
        title: 'Sweaty Boi',
        rankUpRequirements:{
          points: 0,
          matchesWon: 0,
          tournamentsWon: 0,
          tournamentsPlayed: 0,
        },
        perks:[
          {
            name: 'Unlock National Cup',
            category: 'special',
            value: 'national-cup-unlock'
          },
          {
            name: 'One Free Tournament',
            category: 'special',
            value: 'one-free-tournament'
          }
        ]
      }
    ],
    userProfile: null,
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
      thumbnail: 'images/loading.jpeg',
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
      state.userProfile.registeredTournaments.forEach(tournament=>tournament.date = new Date(tournament.date.seconds * 1000))
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
    upcomingRegisteredTournaments: state => {
      return state.userProfile.registeredTournaments.filter(tournament => tournament.date >= state.currentDate);
    },
    rankString: state =>{
      if(state.userProfile.rank == 0){
        return 'Bush Noob'
      } else if (state.userProfile.rank == 1){
        return 'Bob the Builder'
      } else if (state.userProfile.rank == 2){
        return 'Ooga Booga Ops'
      } else if(state.userProfile.rank == 3){
        return 'Sweaty Boi'
      } else{
        return "Error: This Shouldn't Happen"
      }
    },
    rankPerks: state => {
      var nextRank = state.userProfile.rank+1
      let retVal = []
      state.rankPerks[nextRank].perks.forEach(perk => retVal.push({perk:perk.name}))
      return retVal
    },
    rankProgress: state => {
      var userRank = state.userProfile.rank;
      var points = Math.min(state.userProfile.points/state.rankPerks[userRank].rankUpRequirements.points,1);
      points = Math.min(0.7888999,1); //TODO : Corrent Elims to Points and Erase this
      var matchesWon = Math.min(state.userProfile.matchesWon/state.rankPerks[userRank].rankUpRequirements.matchesWon,1);
      var tournamentsPlayed = Math.min(state.userProfile.tournamentsPlayed/state.rankPerks[userRank].rankUpRequirements.tournamentsPlayed,1);
      var tournamentsWon = Math.min(state.userProfile.tournamentsWin/state.rankPerks[userRank].rankUpRequirements.tournamentsWon,1);
      var retVal = [Math.round(points * 100,1),Math.round(matchesWon * 100), Math.round(tournamentsPlayed * 100), Math.round(tournamentsWon * 100)];
      return retVal
    }
  },
  actions: {

  }
})
