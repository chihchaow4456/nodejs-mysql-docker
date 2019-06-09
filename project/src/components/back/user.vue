<template>
    <div>
        <nav-bar></nav-bar>
        <p>User:{{name}}</p>
    </div>
</template>

<script>
import NavBar from '../front/NavBar.vue'
import {mapGetters,mapActions} from 'vuex'
export default {
    data() {
        return{
        }
    },
    computed: {
        ...mapGetters('user',{
            name:'getUserName'
        })
    },
    methods: {
        ...mapActions('user',['getUser'])
    },
    created() {
        this.getUser();
    },
    components: {NavBar}
}
</script>

<style>

</style>
