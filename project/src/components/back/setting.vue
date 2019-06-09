<template>
    <div class="pt-5 offset-md-1 col-md-7">
        <fieldset disabled>
            <div class="row">
                <div class="col m-2">
                <label class="">Email address</label>
                </div>
                <div class="col m-2">
                <label class="">Name</label>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <input type="name" class="form-control" :value="email">
                </div>
                <div class="col-4">
                    <input type="email" class="form-control" :value="name">
                </div>
            </div>
        </fieldset>
        <div class="row">
            <div class="col-4">
                <button type="button" class="btn btn-dark mt-5">Change Password</button>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <button type="button" class="btn btn-dark mt-5" @click="logout()">Log out</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
    computed:{
        ...mapState('user',['name']),
        ...mapState('user',['email'])
    },
    methods:{
        // ...mapActions('user',['logout'])
        logout(){
            this.$store.dispatch('user/logout').then(() =>{
                this.$router.push({path: 'signin'});
            });
        }
    }
}
</script>


