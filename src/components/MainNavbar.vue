<template>
     <!-- //// HEADER //// -->
    <header id="main-header">
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
            <div class="container">
                <!-- Site Logo -->
                <a id="logo" class="navbar-brand" href="#"><img class="img-fluid" src="images/logo.png" alt="site logo"></a>
                <!-- Dropdown Button -->
                <button id="hamburger" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                </button>
                <!-- Navigation Links -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                      
                        <li class="nav-item">
                            <a class="nav-link" href="#games">Upcoming Tournaments</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#team">Top Players</a>
                        </li>
                        <li v-if="userProfile" class="nav-item">
                            <router-link to="/dashboard"><span class="nav-link">{{userProfile.name}}</span></router-link>
                        </li>
                         <li v-else class="nav-item">
                            <router-link to="/dashboard"><span class="nav-link">Login</span></router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header><!-- Header End -->
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState([
            'userProfile',
        ])
    }
}
</script>

