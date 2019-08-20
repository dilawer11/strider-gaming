<template>
  <div class ="login">
    <div class="row">
       <div class="col-1 col-md-4"></div>
        <div class="col-10 col-md-4">
        <div class="card text-center card-block mx-auto">
          <div class="card-body">
            <h5 class="card-title text-dark">Login</h5>
              <form @submit.prevent="submit()">
                <div class="form-group">
                  <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Email">
                </div>
                <div class="form-group">
                  
                  <input type="password" class="form-control" v-model="password" placeholder="Password">
                </div>
                <div class="form-group form-check">
                  <a class="form-check-label text-dark" href="#" >Forgot Password?</a>
                </div>
                <div v-if="feedback" class="p-3 mb-2 bg-danger text-white">{{feedback}}</div>
               
                <button type="submit" class="btn btn-primary">Login</button>
                <router-link to="/register"><button class="btn">Register</button></router-link>
              </form>
          </div>
        </div>
      </div>
      <div class="col-1 col-md-4"></div>
    </div>
  </div>
   
</template>

<script>
import firebase from 'firebase/app'
  export default {
    name: 'login',
    data: () => ({
      wrongPassword: false,
      password: null,
      email: null,
      feedback: null,
    }),
    methods:{
      async submit(){
        this.feedback = null;
        firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(response=>{
          this.$router.push({name: 'userpage'})
        }).catch(err=>{
          this.feedback = err.message
        })

        
        
      }
    }
  }
</script>

