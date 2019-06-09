import axios from 'axios'
import router from '../../router';
const state = {
    // articles: [],
    articles: [
        {"title": "hello","content":"With supporting text below as a natural lead-in to additional","created_on":"2018/12/26","name":"koam"},
        {"title": "hello","content":"With supporting text below as a natural lead-in to additional","created_on":"2018/12/26","name":"koam"},
        {"title": "hello","content":"With supporting text below as a natural lead-in to additional","created_on":"2018/12/26","name":"koam"},
    ],
    // userArticles: [],
    title: "",
    content: "",
    date: "",
    quotient: 0,
    isGetData: false,
    nowPage: 1,
    previous: false,
    next: false
}

const getters = {
    getLocaleDate : state => (id) => {
        const date = new Date(state.articles[id].created_on).toLocaleDateString();
        return date
    },
    getDate : state => {
        const date = new Date(state.date).toLocaleDateString();
        return date
    }
}

const actions = {
    getAllArticle: ({commit,state},page) => {
        return axios.get('/articles',{params: {page}})
            .then((res) => {
                page = parseInt(page);
                if(!page){
                    page = 1;
                }
                if(page > 1 && page < state.quotient){
                    commit('setNext',false);                    
                    commit('setPrevious',false);                    
                }
                if(page <= 1){
                    commit('setPrevious',true);
                    commit('setNext',false);                    
                }
                if(page >= state.quotient){
                    commit('setNext',true);
                    commit('setPrevious',false);
                }
                commit('setPage',page);
                commit('setArticles',res.data);
            })
    },
    getTotal: ({commit}) => {
        return axios.get('/totalArticle')
            .then((total) => {
                const data = parseInt(total.data);
                var remainder = 0;
                if(parseInt(data%3)){
                    remainder = 1;
                }
                commit('setQuotient', parseInt(data/3)+remainder);
            })
    },
    getUserArticles: ({commit}) => {
        return axios.get('/user/articles')
            .then((res) => {
                // console.log(res.data);
                // console.log(res.data[0])
                // console.log(res.data[0].a_id);
                commit('setArticles',res.data);
            }).catch((err) => {
                // router.push({path : 'signin'});
            })
    },
    getArticle:({commit},a_id)=> {
        return axios.get('/user/article',{params: {a_id}})
            .then((res) => {
                commit('setArticle',res.data[0])
            }).catch((err) => {

            })
    },
    addArticle:({dispatch},payload) => {
        return axios.post('/user/article',payload)
            .then((res) => {
                router.push({path: '/'});
            }).catch(() => {
                
            })
    },
    editArticle: ({commit},payload) => {
        return axios.patch(`/user/article/${payload.a_id}`,{title:payload.title,content:payload.content})
            .then((res) => {
                router.push({path : '/'});
            }).catch((err) => {
                console.log(err);
            })
    },
    deleteArticle: ({dispatch},a_id) => {
        return axios.delete(`/user/article/${a_id}`)
            .then(() => {
                dispatch('getAllArticle');
            }).catch((err) => {
                
            })
    }
}

const mutations = {
    setArticles (state,articles) {
        state.articles = articles;
    },
    setArticle  (state,article) {
        state.title = article.title;
        state.content = article.content;
        state.date = article.created_on;
    },
    setQuotient (state,quotient) {
        state.quotient = quotient;
    },
    setRemainder (state,remainder) {
        state.remainder = remainder;
    },
    setIsGetDate (state,isGetData) {
        state.isGetData = isGetData;
    },
    setPage(state,page){
        state.nowPage = page;
    },
    setPrevious(state,bool){
        state.previous = bool;
    },
    setNext(state,bool){
        state.next = bool;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}