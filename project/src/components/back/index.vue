<template>
    <div>
        <nav-bar></nav-bar>
        <div class="container-flauid">
            <div class="row">
              <dash-board></dash-board>
              <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '../front/NavBar.vue'
import DashBoard from '../front/DashBoard.vue'
import {mapState,mapActions} from 'vuex'
export default {
    components:{NavBar,DashBoard},
}
</script>
<style>
  
</style>
