<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Next Rank Unlocks</h3>
        </div>
        <!-- <div class="col text-right">
          <base-button size="sm" type="primary">See all</base-button>
        </div> -->
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="rankPerks">
        <template slot="columns">
          <th></th>
        
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.perk}}
          </th>
          
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
import {mapGetters} from 'vuex'
  export default {
    name: 'social-traffic-table',
    data() {
      return {
    
      }
    },
    computed:{
      ...mapGetters([
        'rankPerks'
      ])
    }

  }
</script>
<style>
</style>
