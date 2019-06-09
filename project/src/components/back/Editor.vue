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
            <button type="button" class="btn btn-dark mt-5 mr-2" @click="edit()">Save Changes</button>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return{
            a_id: this.$route.query.a_id
        }
    },
    methods:{
        edit(){
            this.$store.dispatch('article/editArticle',{a_id:this.a_id,title: this.title, content: this.content})
        },
        ...mapActions('article',['getArticle'])
    },
    computed: {
        title:{
            get: function(){
                return this.$store.state.article.title;
            },
            set: function(value){
                return this.$store.state.article.title = value;
            }
        },
        content:{
            get: function(){
                return this.$store.state.article.content;
            },
            set: function(value){
                return this.$store.state.article.content = value;
            }
        }
    },
    created(){
        this.getArticle(this.a_id);
    }
}
</script>

