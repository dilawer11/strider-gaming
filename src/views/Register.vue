<template>
    <div class="register">
        <div class="row">
            <div class="col-1 col-md-4"></div>
            <div class="col-10 col-md-4">
                <div class="card text-center card-block mx-auto">
                <div class="card-body">
                    <h5 class="card-title text-dark">Register</h5>
                    <form @submit.prevent="submit()">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="firstName"  placeholder="First Name">
                        </div>
                         <div class="form-group">
                            <input type="text" class="form-control" v-model="lastName"  placeholder="Last Name">
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" v-model="email"  placeholder="Email">
                        </div>
                        <div class="form-group">
                         <input type="text" class="form-control" v-model="epicID"  placeholder="Epic ID">
                        </div>
                        <div class="form-group">
                         <input type="text" class="form-control" v-model="platformID"  placeholder="Platform ID (PSN/Live) Optional">
                        </div>
                        <div class="form-group">
                         <input type="text" class="form-control" v-model="contactNumber"  placeholder="Contact Number e.g (03##-#######)">
                        </div>
                        <div class="form-group">
                            <select class="custom-select" v-model="controlType">
                                <option selected disabled>Control Type</option>
                                <option value="kbm">Keyboard and Mouse</option>
                                <option value="con">Controller</option>
                                <option value="mob">Mobile</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" v-model="password" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" v-model="confirmPassword" placeholder="Confirm Password">
                        </div>
                        <div class="form-group form-check text-dark">
                            <input type="checkbox" class="form-check-input" v-model="terms">
                            <label class="form-check-label" >Do you agree to our terms and conditions</label>
                        </div>
                        <div v-if="feedback" class="p-3 mb-2 bg-danger text-white">{{feedback}}</div>
                        <button type="submit" class="btn btn-primary">Create Account</button>
                        <router-link to="/login"><button class="btn">Login</button></router-link>
                    </form>
                </div>
                </div>
            </div>
            <div class= "col-1 col-md-4"></div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init.js'
import firebase from 'firebase/app'
import validation from '@/jsfiles/validation.js'
export default {
    name: 'register',
    data: () =>{
        return {
            firstName : null,
            lastName : null,
            email : null,
            epicID : null,
            platformID: null,
            contactNumber: null,
            controlType: 'Control Type',
            password : null,
            confirmPassword: null,
            feedback: null,
            terms: false,
        }
    },
    methods:{
        submit() {
            this.feedback = null;
            let userProfile = {
                name: this.firstName + ' ' + this.lastName,
                accountBalance: 0,
                registeredTournaments:[],
                epicID: this.epicID,
                tournamentsPlayed: 0,
                tournamentsWin: 0,
                eliminations: 0,
                matchesWon: 0,
                notifications: [],
                email: this.email,
                platformID: this.platformID,
                contactNumber: this.contactNumber,
                controlType: this.controlType,
            }
            this.feedback = validation.validateUserInformation(userProfile,this.terms,this.password,this.confirmPassword)
            if(!this.feedback){
                    firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(resp => {
                    const user = firebase.auth().currentUser;
                    if(user){
                        db.collection('users').doc(user.uid).set(userProfile).then(resp =>{
                            firebase.auth().signOut().then(res=>{
                                alert("You Have Been Successfully Registered. Please Login to Continue");
                                this.$router.push({name: 'login'})
                            })
                        })
                        
                       
                            
                    } else{
                        this.feedback = "Error Can't Find User"
                        console.log(this.feedback);
                    }
                }).catch(err => {
                    this.feedback = err.message;
                })
            }
        }
    }
}
</script>

<style>

</style>
