<template>
<div class="container h-100" >
    <div class="row h-100 justify-content-center align-items-center">
        <div class="col-4">
            <h2 class="text-center font-weight-bold">simple-website</h2>
			<div class="form-group">
				<label>Email</label>
				<input type="email" class="form-control" placeholder="email" v-model.trim="email">
			</div>
			<div class="form-group">
				<label>Name</label>
				<input type="email" class="form-control" placeholder="name" v-model.trim="name">
			</div>
			<div class="form-group">
				<label>Password</label>
				<input type="password" class="form-control" placeholder="password" v-model.trim="password">
			</div>
			<p class="text-center">{{msg}}</p>
			<div class="row">
				<div class="col-auto mr-auto align-self-center">
					<a href="/signin">Sign in</a>
				</div>
				<div class="col-auto">
					<button @click="submit()" class="btn btn-dark">Sign up</button>
				</div>
			</div>
        </div>
    </div>
</div>
</template>
<script>

export default {
  data(){
    return {
        name: "",
        email: "",
        password: "",
        msg: ""
    }
  },
  methods: {
      submit() {
		if(!this.name.length) return this.msg = '請輸入正確的用戶名'
		if(!this.email) return this.msg = '請輸入信箱'
		if(this.password < 6) return this.msg = '密碼長度太短'
        this.$store.dispatch('user/signup',{email: this.email, name: this.name, password: this.password})
        .then(() => {
            setTimeout(() => window.location.reload() , 2500)
            this.$router.push({path: '/'})
        })
        .catch((err) => {
			this.msg = err;
		})
           
      }
  }
}
</script>

