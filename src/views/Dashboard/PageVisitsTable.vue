<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Past Tournaments</h3>
        </div>
        <div class="col text-right">
          
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="tournamentsDone">
        <template slot="columns">
          <th>Name</th>
          <th>Points</th>
          <th>Matches Won</th>
          <th>Placement</th>
          <th>Winnings</th>
         
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.name}}
          </th>
          <td>
            {{row.stats.points}}
          </td>
          <td>
            {{row.stats.matchesWon}}
          </td>
          <td>
            {{row.stats.placement}}
          </td>
          <td>
            {{row.stats.winnings}}
          </td>
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
import {mapGetters } from 'vuex'
  export default {
    name: 'past-tournaments-table',
    data() {
      return {
        
      }
    },
    computed:{
      ...mapGetters([
        'tournamentsDone'
      ])
    }
  }
</script>
<style>
</style>
