import axios  from 'axios'
import Cookie from 'js-cookie'
import router from '../../router';
const state = {
    name: '',
    email: '',
    token: ''
}

const getters = {
    getUserName : state => {
        return state.name
    }
}

const actions = {
    signin: ({commit}, payload) => {
        return axios.post('/signin', payload)
            .then((res) => {
                commit('setToken', res.headers['x-auth']);
            })
            .catch((err) => {
                return Promise.reject(err.response.data);
            })
    },
    signup: ({commit}, payload) => {
        return axios.post('/signup', payload)
            .catch((err) => {
                return Promise.reject(err.response.data);
            })
    },
    getUser: ({commit}) => {
        return axios.get('/user')
            .then((res) => {
                commit('setName', res.data[0].name);
                commit('setEmail', res.data[0].email);
            })
            .catch(() => {
                router.push({path : 'signin'});
            })
    },
    logout: ({commit}) => {
        return axios.delete('/user/token')
            .then((res) => {
                Cookie.remove('x-auth');
            }).catch((err) => {

            })
    }
}

const mutations = {
    setName (state , name) {
        state.name = name;
    },
    setToken (state , token) {
        state.token = token;
    },
    setEmail (state, email) {
        state.email = email;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
