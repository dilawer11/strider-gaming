export default{
    createNewUserProfile(name,email,discordID,thumbnail){
       let userProfile = {
           name: name,
           email: email,
           discordID: discordID,
           accountBalance : 0,
           tournamentsPlayed: 0,
           tournamentsWon: 0,
           matchesWon: 0,
           points: 0,
           rank: 0,
           notifications: [],
           registeredTournaments: [],
           thumbnail: thumbnail
       }
       return userProfile;
    }
}