<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3">
                        <small>Sign up with</small>
                    </div>
                    <div class="btn-wrapper text-center">
                        <button @click="loginWithFacebook()" class="btn btn-neutral btn-icon">
                            <span class="btn-inner--icon"><img src="img/icons/common/facebook.svg"></span>
                            <span class="btn-inner--text text-warning">Facebook</span>
                        </button>
                        <button @click="loginWithGoogle()" class="btn btn-neutral btn-icon">
                            <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                            <span class="btn-inner--text text-warning">Google</span>
                        </button>
                    </div>
                </div>
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Or sign up with credentials</small>
                    </div>
                    <form role="form">

                        <base-input class="input-group-alternative mb-2"
                                    placeholder="Name"
                                    addon-left-icon="ni ni-hat-3"
                                    v-model="model.name">
                        </base-input>

                        <base-input class="input-group-alternative mb-2"
                                    placeholder="Email"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.email">
                        </base-input>
                        <base-input class="input-group-alternative mb-2"
                                    placeholder="Discord ID"
                                    addon-left-icon="ni ni-circle-08"
                                    v-model="model.discordID">
                        </base-input>
                        <base-input class="input-group-alternative mb-2"
                                    placeholder="Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Confirm Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.confirmPassword">
                        </base-input>

                        <!-- <div class="text-muted font-italic">
                            <small>password strength: <span class="text-success font-weight-700">strong</span></small>
                        </div> -->

                        <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative" v-model="model.terms">
                                    <span class="text-muted">I agree with the <a href="/docs/privacypolicy.pdf">Privacy Policy</a></span>
                                </base-checkbox>
                            </div>
                        </div>
                         <div class="text-center bg-danger" v-if="feedback">
                            <p class="text-white">{{feedback}}</p>
                        </div>
                        <div class="text-center">
                            <base-button @click="submit()" type="primary btn-warning" class="my-4">Create account</base-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light">
                        <small>Forgot password?</small>
                    </a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import db from '@/firebase/init'
import validation from '@/jsfiles/validation.js'
import accountCreation from '@/jsfiles/accountCreation.js'
import firebase from 'firebase/app'
  export default {
    name: 'register',
    data() {
      return {
        feedback: null,
        model: {
          name: '',
          email: '',
          discordID: '',
          password: '',
          confirmPassword: '',
          terms: false,
        }
      }
    },
    methods:{
            submit() {
            this.feedback = null;
            let userProfile = accountCreation.createNewUserProfile(this.model.name,this.model.email,this.model.discordID,null)
            this.feedback = validation.validateUserInformation(userProfile,this.model.terms,this.model.password,this.model.confirmPassword)
            if(!this.feedback){
                    firebase.auth().createUserWithEmailAndPassword(this.model.email,this.model.password).then(() => {
                    const user = firebase.auth().currentUser;
                    if(user){
                        db.collection('users').doc(user.uid).set(userProfile).then(() =>{
                            firebase.auth().signOut().then(()=>{
                                alert("You Have Been Successfully Registered. Please Login to Continue");
                                this.$router.push({name: 'dashboard'})
                            })
                        })
                    } else{
                        this.feedback = "Error Can't Find User"
                    }
                }).catch(err => {
                    this.feedback = err.message;
                })
            }
        },
        loginWithGoogle(){
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/userinfo.email');
            provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
            firebase.auth().signInWithPopup(provider).then(result => {
                db.collection('users').doc(result.user.uid).get().then(doc=>{
                    if(!doc.exists){
                        var email = result.additionalUserInfo.profile.email;
                        var name = result.additionalUserInfo.profile.name;
                        var profilePicture = result.additionalUserInfo.profile.picture;
                        let userProfile = accountCreation.createNewUserProfile(name,email,null,profilePicture);
                        db.collection('users').doc(result.user.uid).set(userProfile).then(()=>{
                            this.$router.push({name:'dashboard'})
                        })
                    } else{
                        this.$router.push({name:'dashboard'})
                    }
                }).catch(err=>{
                    this.feedback = err.message;
                })
                
            }).catch(err=>{
                this.feedback = err.message
            })
        },
        loginWithFacebook(){
            var provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider).then(result => {
                db.collection('users').doc(result.user.uid).get().then(doc=>{
                    if(!doc.exists){
                        var email = result.additionalUserInfo.profile.email;
                        var name = result.additionalUserInfo.profile.name;
                        var profilePicture = result.additionalUserInfo.profile.picture.data.url
                        let userProfile = accountCreation.createNewUserProfile(name,email,null,profilePicture);
                        db.collection('users').doc(result.user.uid).set(userProfile).then(()=>{
                            this.$router.push({name:'dashboard'})
                        })
                    } else{
                        this.$router.push({name:'dashboard'})
                    }
                }).catch(err=>{
                    this.feedback = err.message;
                })
            }).catch(err=>{
                this.feedback = err.message
            })
        },
    }
  }
</script>
<style>
</style>
