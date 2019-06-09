<template>
    <div class="pt-5 offset-md-1 col-md-7">
        <div class="row">
            <label class="">Title</label>
        </div>
        <div class="row">
            <div class="col-md-3 p-0">
                <input type="text" class="form-control" name="" v-model="title">            
            </div>
        </div>
        <div class="row">
            <label class="">Content</label>
        </div>
        <div class="row">
            <textarea class="form-control" rows="10" v-model="content"></textarea>
        </div>
        <div class="row">
            <button type="button" class="btn btn-dark mt-5 mr-2" @click="add()">Save Changes</button>            
            <!-- <button type="button" class="btn btn-primary mt-5" @click="modal">Canc</button> -->
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return{
            title:"",
            content:""
        }
    },
    methods:{
        add(){
            this.$store.dispatch('article/addArticle',{title: this.title, content: this.content})
        }
    },
    computed: {
    },
    created(){

    }
}
</script>

