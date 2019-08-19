<template>
      <div id="content-wrapper">

      <div class="container-fluid">

        <!-- Breadcrumbs-->
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">Overview</li>
        </ol>

        <!-- Icon Cards-->
        <div class="row">
          <div class="col-xl-3 col-sm-6 mb-3">
            <div class="card text-white bg-primary o-hidden h-100">
              <div class="card-body">
                <div class="card-body-icon">
                  <i class="fas fa-fw fa-comments"></i>
                </div>
                <div class="mr-5"><h2>{{userProfile.matchesWon}}</h2></div>
              </div>
              <a class="card-footer text-white clearfix small z-1" href="#">
                <span class="float-left">Matches Won</span>
              
              </a>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-3">
            <div class="card text-white bg-warning o-hidden h-100">
              <div class="card-body">
                <div class="card-body-icon">
                  <i class="fas fa-fw fa-list"></i>
                </div>
                <div class="mr-5"><h2>{{userProfile.tournamentsPlayed}}</h2></div>
              </div>
              <a class="card-footer text-white clearfix small z-1" href="#">
                <span class="float-left">Tournaments Played</span>
                
              </a>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-3">
            <div class="card text-white bg-success o-hidden h-100">
              <div class="card-body">
                <div class="card-body-icon">
                  <i class="fas fa-fw fa-shopping-cart"></i>
                </div>
                <div class="mr-2"><h2>{{userProfile.tournamentsWin}}</h2></div>
              </div>
              <a class="card-footer text-white clearfix small z-1" href="#">
                <span class="float-left">Tournament Wins</span>
              
              </a>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-3">
            <div class="card text-white bg-danger o-hidden h-100">
              <div class="card-body">
                <div class="card-body-icon">
                  <i class="fas fa-fw fa-life-ring"></i>
                </div>
                <div class="mr-3"><h2>{{userProfile.eliminations}}</h2></div>
              </div>
              <a class="card-footer text-white clearfix small z-1" href="#">
                <span class="float-left">Eliminations</span>
               
              </a>
            </div>
          </div>
        </div>

        <!-- Area Chart Example-->
        <div class="card mb-3">
          <div class="card-header" style="color:black;">
            <i class="fas fa-chart-area"></i>
            Progress Bar</div>
          <div class="card-body" style="color:black;">
            <p> Eliminations </p>
            <div class="progress">
              <div class="progress-bar" role="progressbar" :style="progressBars.bar1" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <p> Match Wins</p>
            <div class="progress">
              <div class="progress-bar" role="progressbar" :style="progressBars.bar2"  aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <p> Tournaments Played </p>
            <div class="progress">
              <div class="progress-bar bg-danger" role="progressbar" :style="progressBars.bar3"  aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br>

          </div>
          <div class="card-footer small text-muted">Updated After Each Tournament</div>
        </div>

        <!-- DataTables Example -->
        <div class="card mb-3">
          <div class="card-header text-dark" style="color:black; ">
            <i class="fas fa-table"></i>
            Tournament Table</div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>Tournament Name</th>
                    <th>Winnings</th>
                    <th>Placement</th>
                    <th>Eliminations</th>
                    <th>Matches Won</th>
                    <th>Points Earned</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Tournament Name</th>
                    <th>Winnings</th>
                    <th>Placement</th>
                    <th>Eliminations</th>
                    <th>Matches Won</th>
                    <th>Points Earned</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr v-for="(tournament,i) in tournamentsDone" :key="i">
                    <td>{{tournament.name}}</td>
                    <!-- <td>Rs.{{tournament.stats.winnings}}</td> -->
                    <td>{{tournament.stats.placement}}</td>
                    <td>{{tournament.stats.eliminations}}</td>
                    <td>{{tournament.stats.matchesWon}}</td>
                    <td>{{tournament.stats.points}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer small text-muted">Updated After Each Tournament</div>
        </div>

      </div>
      <!-- /.container-fluid -->

   

    </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
export default {
  name: 'playerstats',

  data(){
    return{

    }
  },
  created(){
  },
  computed:{
    ...mapGetters([
      'tournamentsDone',
    ]),
    ...mapState([
      'userProfile'
    ]),
    progressBars(){
      let eliminationsRequired = 15  //change these lets
      let matchWinsRequired = 5;
      let tournamentsPlayedRequired = 2; 
      var eliminations = (this.userProfile.eliminations/eliminationsRequired) * 100;
      var matchWins = (this.userProfile.matchesWon/matchWinsRequired) * 100;
      var tournamentsCount = (this.userProfile.tournamentsPlayed/tournamentsPlayedRequired) * 100;

      return{
        bar1: 'width: '+ eliminations +'%',
        bar2: 'width: '+ matchWins +'%',
        bar3: 'width: '+ tournamentsCount +'%',
      }
    }
  }
}
</script>

<style scoped>

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}

.table-sm th,
.table-sm td {
  padding: 0.3rem;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-bordered thead th,
.table-bordered thead td {
  border-bottom-width: 2px;
}

.table-borderless th,
.table-borderless td,
.table-borderless thead th,
.table-borderless tbody + tbody {
  border: 0;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.table-hover tbody tr:hover {
  color: #212529;
  background-color: rgba(0, 0, 0, 0.075);
}

.table-primary,
.table-primary > th,
.table-primary > td {
  background-color: #b8daff;
}

.table-primary th,
.table-primary td,
.table-primary thead th,
.table-primary tbody + tbody {
  border-color: #7abaff;
}

.table-hover .table-primary:hover {
  background-color: #9fcdff;
}

.table-hover .table-primary:hover > td,
.table-hover .table-primary:hover > th {
  background-color: #9fcdff;
}

.table-secondary,
.table-secondary > th,
.table-secondary > td {
  background-color: #d6d8db;
}

.table-secondary th,
.table-secondary td,
.table-secondary thead th,
.table-secondary tbody + tbody {
  border-color: #b3b7bb;
}

.table-hover .table-secondary:hover {
  background-color: #c8cbcf;
}

.table-hover .table-secondary:hover > td,
.table-hover .table-secondary:hover > th {
  background-color: #c8cbcf;
}

.table-success,
.table-success > th,
.table-success > td {
  background-color: #c3e6cb;
}

.table-success th,
.table-success td,
.table-success thead th,
.table-success tbody + tbody {
  border-color: #8fd19e;
}

.table-hover .table-success:hover {
  background-color: #b1dfbb;
}

.table-hover .table-success:hover > td,
.table-hover .table-success:hover > th {
  background-color: #b1dfbb;
}

.table-info,
.table-info > th,
.table-info > td {
  background-color: #bee5eb;
}

.table-info th,
.table-info td,
.table-info thead th,
.table-info tbody + tbody {
  border-color: #86cfda;
}

.table-hover .table-info:hover {
  background-color: #abdde5;
}

.table-hover .table-info:hover > td,
.table-hover .table-info:hover > th {
  background-color: #abdde5;
}

.table-warning,
.table-warning > th,
.table-warning > td {
  background-color: #ffeeba;
}

.table-warning th,
.table-warning td,
.table-warning thead th,
.table-warning tbody + tbody {
  border-color: #ffdf7e;
}

.table-hover .table-warning:hover {
  background-color: #ffe8a1;
}

.table-hover .table-warning:hover > td,
.table-hover .table-warning:hover > th {
  background-color: #ffe8a1;
}

.table-danger,
.table-danger > th,
.table-danger > td {
  background-color: #f5c6cb;
}

.table-danger th,
.table-danger td,
.table-danger thead th,
.table-danger tbody + tbody {
  border-color: #ed969e;
}

.table-hover .table-danger:hover {
  background-color: #f1b0b7;
}

.table-hover .table-danger:hover > td,
.table-hover .table-danger:hover > th {
  background-color: #f1b0b7;
}

.table-light,
.table-light > th,
.table-light > td {
  background-color: #fdfdfe;
}

.table-light th,
.table-light td,
.table-light thead th,
.table-light tbody + tbody {
  border-color: #fbfcfc;
}

.table-hover .table-light:hover {
  background-color: #ececf6;
}

.table-hover .table-light:hover > td,
.table-hover .table-light:hover > th {
  background-color: #ececf6;
}

.table-dark,
.table-dark > th,
.table-dark > td {
  background-color: #c6c8ca;
}

.table-dark th,
.table-dark td,
.table-dark thead th,
.table-dark tbody + tbody {
  border-color: #95999c;
}

.table-hover .table-dark:hover {
  background-color: #b9bbbe;
}

.table-hover .table-dark:hover > td,
.table-hover .table-dark:hover > th {
  background-color: #b9bbbe;
}

.table-active,
.table-active > th,
.table-active > td {
  background-color: rgba(0, 0, 0, 0.075);
}

.table-hover .table-active:hover {
  background-color: rgba(0, 0, 0, 0.075);
}

.table-hover .table-active:hover > td,
.table-hover .table-active:hover > th {
  background-color: rgba(0, 0, 0, 0.075);
}

.table .thead-dark th {
  color: #fff;
  background-color: #343a40;
  border-color: #454d55;
}

.table .thead-light th {
  color: #495057;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.table-dark {
  color: #fff;
  background-color: #343a40;
}

.table-dark th,
.table-dark td,
.table-dark thead th {
  border-color: #454d55;
}

.table-dark.table-bordered {
  border: 0;
}

.table-dark.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(255, 255, 255, 0.05);
}

.table-dark.table-hover tbody tr:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.075);
}

@media (max-width: 575.98px) {
  .table-responsive-sm {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .table-responsive-sm > .table-bordered {
    border: 0;
  }
}

@media (max-width: 767.98px) {
  .table-responsive-md {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .table-responsive-md > .table-bordered {
    border: 0;
  }
}

@media (max-width: 991.98px) {
  .table-responsive-lg {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .table-responsive-lg > .table-bordered {
    border: 0;
  }
}

@media (max-width: 1199.98px) {
  .table-responsive-xl {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .table-responsive-xl > .table-bordered {
    border: 0;
  }
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table-responsive > .table-bordered {
  border: 0;
}
</style>

