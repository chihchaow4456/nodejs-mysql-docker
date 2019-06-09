import Vue     from 'vue';
import Router  from 'vue-router';
import Cookie  from 'js-cookie';
import axios   from 'axios';

import Index    from '../components/back/index.vue';
import Articles from '../components/back/articles.vue';
import Posts    from '../components/back/posts.vue';
import Signup   from '../components/back/signup.vue';
import Signin   from '../components/back/signin.vue';
import User     from '../components/back/user.vue';
import Setting  from '../components/back/setting.vue';
import Editor   from '../components/back/Editor.vue';
import Add      from '../components/back/addArticle.vue';
import Display  from '../components/back/display.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/', 
            component: Index,
            children: [
                {path: '', component: Articles ,meta: { requireAuth: true}},
                {path: 'all', name: 'articles', component: Articles ,meta: { requireAuth: true}},
                {path: 'posts', name: 'posts', component: Posts, meta: {requireAuth: true}},
                {path: 'setting', name: 'setting', component: Setting, meta: {requireAuth: true}},
                {path: 'editor', name: 'editor', component: Editor, meta: {requireAuth: true}},
                {path: 'add', name: 'add', component: Add, meta: {requireAuth: true}},
                {path: 'display', name: 'display', component: Display, meta: {requireAuth: true}}
            ]
        },
        {path: '/signup', component: Signup},
        {path: '/signin', component: Signin},
        {path: '/user' , name: 'user' ,component: User , meta: { requireAuth: true}}       
    ]
})

router.beforeEach((to,from,next) => {
    if(to.meta.requireAuth){
        const auth = Cookie.get('x-auth');
        axios.defaults.headers.common['x-auth'] = auth;
        if(auth){
            next();
        }else{
            next({path: 'signin'});
        }
    }
    next();
})

export default router