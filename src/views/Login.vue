<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-5">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                        <div class="btn-wrapper text-center">
                            <button @click="loginWithFacebook()" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/facebook.svg"></span>
                                <span class="btn-inner--text">Facebook</span>
                            </button>
                            <button @click="loginWithGoogle()" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </button>
                        </div>
                    </div>
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <!-- <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox> -->
                            <div class="bg-danger text-center" v-if="feedback">
                            <p class="text-white" >{{feedback}}</p> 
                            </div>
                            <div class="text-center">
                                <base-button @click="loginWithEmailandPassword()" type="primary btn-warning" class="my-4">Sign in</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>Forgot password?</small></a>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase/app'
  export default {
    name: 'login',
    data() {
      return {
        feedback: null,
        model: {
          email: '',
          password: '',
        }
      }
    },
    created(){
        // this.facebookInit();
    },
    methods:{
        loginWithEmailandPassword(){
            this.feedback = null;
            firebase.auth().signInWithEmailAndPassword(this.model.email,this.model.password).then(()=>{
                this.$router.push({name: 'dashboard'})
            }).catch(err=>{
                this.feedback = err.message
            })
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
                        db.collection('users').doc(result.user.uid).set({
                            name: name,
                            email: email,
                            thumbnail: profilePicture,
                        })
                        //TODO: Set User Profile 
                    } 
                    this.$router.push({name:'dashboard'})
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
                        db.collection('users').doc(result.user.uid).set({
                            name: name,
                            email: email,
                            thumbnail: profilePicture,
                        })
                        //TODO: Set User Profile 
                    }
                    this.$router.push({name:'dashboard'})
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
