<template>
<div class="container h-100" >
    <div class="row h-100 justify-content-center align-items-center">
        <div class="col-4">
            <h2 class="text-center font-weight-bold">simple-website</h2>
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" placeholder="Email" v-model.trim="email">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Password" v-model.trim="password">
            </div>
            <p class="text-center">{{msg}}</p>
            <div class="row">
                <div class="col-auto mr-auto align-self-center">
                    <a href="/signup">Sign up</a>
                </div>
                <div class="col-auto">
                    <button @click="signin()" class="btn btn-dark">Sign in</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';
import {mapActions} from 'vuex';
export default {
    data(){
        return {
            email: "",
            password: "",
            msg: ""
        }
    },
    methods: {
        signin() {
            if(!this.email) return this.msg = '請輸入信箱'
            if(!this.password) return this.msg = "請輸入密碼"
            this.$store.dispatch('user/signin',{email: this.email, password: this.password})
            .then(() => {
                this.$router.push({path: '/'});
            })
            .catch((err) => {
                this.msg = err;
            })
        }
    }
}
</script>