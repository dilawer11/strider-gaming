<template>
    <div class="register">
        <div class="row h-100">
            <div class="col-sm-12">
                <div class="card text-center card-block w-25 mx-auto">
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
                         <input type="text" class="form-control" v-model="contactNumber"  placeholder="Contact Number">
                        </div>
                        <div class="form-group">
                            <select class="custom-select" v-model="controlType">
                                <option selected disabled>Control Type</option>
                                <option value="kbm">Keyboard and Mouse</option>
                                <option value="con">Controller</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="exampleInputPassword1" v-model="confirmPassword" placeholder="Confirm Password">
                        </div>
                        <div class="form-group form-check text-dark">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Do you agree to our terms and conditions</label>
                        </div>
                   
                        <button type="submit" class="btn btn-primary">Create Account</button>
                        <router-link to="/login"><button class="btn">Login</button></router-link>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init.js'
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
        }
    },
    methods:{
        submit() {
            console.log(this.email,this.password,this.firstName,this.lastName, this.controlType)
        }
    }
}
</script>

<style>

</style>
