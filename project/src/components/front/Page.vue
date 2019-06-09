<template>
    <div class="row justify-content-md-center mt-4">
        <ul class="pagination">
            <li class="page-item" :class="{disabled:previous}">
                <router-link :to="{name: 'articles', query: {page: nowPage-1}}" class="page-link">
                    Previous
                </router-link>
            </li>
            <li class="page-item" v-for="(page,index) in quotient" :key="index">
                <router-link :to="{name: 'articles', query: {page: index+1}}" class="page-link">
                    {{index+1}}
                </router-link>
            </li>
            <li class="page-item" :class="{disabled:next}">
                <router-link :to="{name: 'articles', query: {page: nowPage+1}}" class="page-link">
                    Next
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
    methods: {
        ...mapActions('article',['getTotal'])
    },
    computed: {
        ...mapState('article',['quotient']),
        ...mapState('article',['nowPage']),
        ...mapState('article',['previous']),
        ...mapState('article',['next']),
    },
    created(){
        this.getTotal();
    }
}
</script>

