<template>
<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white">
            <a class="nav-link my-0 mr-md-auto font-weight-bold text-dark" href="/">simple-website</a>
            <nav class="px-mr-4">
                <div>
                <router-link class="p-4 text-dark " style="text-decoration: none" :to="{name: 'user'} ">
                    <font-awesome-icon class="fa-lg" icon="user" />
                    <strong>{{user}}</strong>
                </router-link>
                </div>
            </nav>
    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    computed:{
        ...mapGetters('user',{
            user: 'getUserName'
        })
    },
    methods:{
        ...mapActions('user',['getUser'])
    },
    created(){
        this.getUser();
    }
}

</script>

