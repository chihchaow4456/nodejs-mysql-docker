<template>
    <div class="pt-5 offset-md-1 col-md-7">
        <div class="row" style="height:80px">
            <label class="">{{title}}</label>
        </div>
        <div class="row" style="height:250px">
            <label class="">{{content}}</label>
        </div>
        <div class="text-right">{{date}}</div>
    </div>
</template>
<script>
import {mapActions,mapState,mapGetters} from 'vuex'
export default {
    data(){
        return{
            a_id: this.$route.query.a_id
        }
    },
    methods:{
        ...mapActions('article',['getArticle'])
    },
    computed:{
        ...mapState('article',['title']),
        ...mapState('article',['content']),
        ...mapGetters('article',{
            date: 'getDate'
            })
    },
    created(){
        this.getArticle(this.a_id);
    }
}
</script>
