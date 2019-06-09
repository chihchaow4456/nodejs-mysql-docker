<template>
    <div class="pt-5 offset-md-2 col-md-7">
        <div class="row m-3 text-center">
            <div class="col">Title</div>
            <div class="col">Date</div>
            <div class="col">Option</div>
        </div>
        <div v-for="(article,index) in articles" :key="index">
            <div class="row m-3 text-center">
                <div class="col">{{article.title}}</div>
                <div class="col">{{date(index)}}</div>
                <div class="col">
                    <router-link :to="{name: 'editor' , query: {a_id: article.a_id}}" class="text-dark">
                        <font-awesome-icon class="fa-lg" icon="edit" />
                    </router-link>
                    <router-link :to="{path: '/'}" class="text-dark">
                        <font-awesome-icon class="fa-lg text-dark" icon="trash-alt" @click="deleteArticle(article.a_id)"/>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions, mapGetters} from 'vuex'
export default {
    methods: {
        ...mapActions('article',['getUserArticles']),
        ...mapActions('article',['deleteArticle'])
    },
    computed: {
        ...mapState('article',['articles']),
        ...mapGetters('article',{
            date: 'getLocaleDate'
            })
    },
    created(){
        this.getUserArticles()
    },
}
</script>

