import Vue      from 'vue';

import VueAxios from 'vue-axios';
import axios    from 'axios';

Vue.use(VueAxios, axios);

//fontawesome
import { library }         from '@fortawesome/fontawesome-svg-core'
import { faUser }          from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart }  from '@fortawesome/free-solid-svg-icons'
import { faCartPlus}       from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit }          from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt }      from '@fortawesome/free-solid-svg-icons'

import router from './router/index'
import store  from './store/index'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';

library.add(faUser)
library.add(faShoppingCart)
library.add(faCartPlus)
library.add(faEdit)
library.add(faTrashAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
    router,
    store
}).$mount('#simple-website');
