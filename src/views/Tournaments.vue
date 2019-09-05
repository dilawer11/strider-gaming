<template>
    <div>
        <base-header type="gradient-warning" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
     
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <projects-table title="Upcoming Tournaments"></projects-table>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col">
                    <projects-table type="dark" title="Dark Table"></projects-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import ProjectsTable from './Tables/ProjectsTable'
  export default {
    name: 'tables',
    components: {
      ProjectsTable
    }
  };
</script>
<style></style>
