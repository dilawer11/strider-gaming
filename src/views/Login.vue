<template>
  <div class ="login">
    <div class="row h-100">
      <div class="col-sm-12">
        <div class="card text-center card-block w-25 mx-auto">
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
                <div v-if="wrongPassword" class="p-3 mb-2 bg-danger text-white">Wrong Username/Password</div>
               
                <button type="submit" class="btn btn-primary">Login</button>
                <router-link to="/register"><button class="btn">Register</button></router-link>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
   
</template>

<script>
  export default {
    name: 'login',
    props: {
      source: String,
    },
    data: () => ({
      wrongPassword: false,
      password: null,
      email: null,
    }),
    methods:{
      submit(){
        console.log(this.email,this.password)
      }
    }
  }
</script>

