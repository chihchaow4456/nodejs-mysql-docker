<template>
  <div class="pt-5 offset-md-3 col-md-5">
    <div class="card border-dark card-hover w-100 m-2" v-for="(article,index) in articles" :key="index">
      <router-link :to="{name: 'display', query: {a_id: article.a_id}}" class="text-secondary" style="text-decoration: none;">
        <div class="card-body">
          <h5 class="card-title">{{article.title}}</h5>
          <p class="card-text">{{article.content}}</p>
          <p class="card-text text-right"><small class="text-muted">{{date(index)}},by {{article.name}}</small></p>
        </div>
      </router-link>  
    </div>
    <page></page>
  </div>
</template>
<script>
import Page from '../front/Page.vue'
import { mapState,mapActions,mapGetters } from 'vuex'
export default {
    data(){
      return{
            page: this.$route.query.page
        }
    },
    methods:{
        ...mapActions('article',['getAllArticle']),      
    },
    computed:{
        ...mapState('article',['articles']),
        ...mapGetters('article',{
            date: 'getLocaleDate'
            })
    },
    components:{Page},
    watch:{
      '$route.query.page': function(page){
          this.getAllArticle(page);
      }
    },
    created(){
      this.getAllArticle(this.page);
    }
}
</script>
<style scoped>
.text-secondary:hover{
  background-color: rgb(248, 249, 250)
}
</style>
