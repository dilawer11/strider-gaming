<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-warning opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Hello Jesse</h1>
                        <p class="text-white mt-0 mb-5">This is your add game page. You can add the games you play here and update your info to register for tournaments.</p>
                        <!-- <a href="#!" class="btn btn-dark">Edit profile</a> -->
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                      
                        <div class="card-body pt-0 pt-md-4">
                         
                            <div class="text-center">
                                <h3>
                                    Games You Play
                                </h3>
                                <h4 v-if="!gamesPlayed.length">You currently play no games please add games</h4>
                                <ul v-else>
                                    <li v-for="(gameName,gameIndex) in gamesPlayed" :key="gameIndex" >{{gameName}}</li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">My account</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <!-- <a href="#!" class="btn btn-sm btn-primary">Settings</a> -->
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">Select Game</h6>
                                <div class="pl-lg-4">
                                    <div class="form-group">
                                        <base-input alternative=""
                                                    input-classes="form-control-alternative">
                                        <select class ="form-control-alternative" v-model="gameSelected">
                                            <option disabled selected>Select Game</option>
                                            <option v-for="(gameName,gameIndex) in Object.keys(gameModel)" :key="gameIndex">{{gameName}}</option>
                                            </select>
                                        </base-input>
                                    </div>
                                </div>
                                <div v-if="gameSelected">
                
                                <hr class="my-4" />
                                <h6 class="heading-small text-muted mb-4">{{gameSelected}} information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div v-for="(inputNames,inputIndex) in currentGameSelected" :key="inputIndex" class="col-lg-4">
                                            <base-input alternative=""
                                                        :label="inputNames"
                                                        :placeholder="inputNames"
                                                        input-classes="form-control-alternative"
                                                        :v-model="gameModel[gameSelected][inputNames]"
                                            />
                                        </div>
                                   
                                    </div>
                                </div>
                                
                                 <div class="text-center">
                                    <base-button @click="addNewGame()" type="primary btn-warning" class="my-4">Save Game</base-button>
                                </div>
                                </div>

                            </form>
                        
                        </template>
                    </card>
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'user-profile',
    data() {
      return {
        gameSelected : null,
        gamesPlayed: [],
        gameModel: {
            Fortnite: {
                EpicID: '',
                Platform: '',
            },
            FIFA:{
                EAUserName:'',
            }
        }
      }
    },
    computed:{
        currentGameSelected(){
            var currentGame = this.gameModel[this.gameSelected];
            //TODO: handle erros and exceptions
            return Object.keys(currentGame)
        }
    },
    methods:{
        addNewGame(){
        
        },
        selectGame(){

        }
    }
  };
</script>
<style></style>
