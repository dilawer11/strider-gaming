<template>
    <div class="tournament-register">
     
        <div class="row h-100">
            <div class="col-sm-12">
                <div class="card text-center card-block mx-auto">
                <div class="card-body">
                    <!-- <h5 class="card-title text-dark">Tournament Register</h5> -->
                    <form @submit.prevent="submit()">
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-3 col-form-label text-dark">Tournament Name</label>
                            <div class="col-sm-9">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="tournamentDetails.name">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-3 col-form-label text-dark">Tournament Fee</label>
                            <div class="col-sm-9">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="tournamentDetails.fee + ' Per Player'">
                            </div>
                        </div>
                        <div v-for="i in tournamentDetails.numberTeam-1" :key="i" class="form-group row">
                            <label for="staticEmail" class="col-sm-3 col-form-label text-dark">Partner {{i}}</label>
                            <div class="col-sm-9">
                            <input type="text" class="form-control-plaintext" id="staticEmail" placeholder="EpicID">
                            </div>
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label text-dark" for="exampleCheck1">Agree to tournament rules</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Confirm Register</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tournamentregister',
    props:{
        tournamentDetails: Object
    },
    data : () => ({

    }),
    created(){
    },
 
}
</script>

<style>

</style>
