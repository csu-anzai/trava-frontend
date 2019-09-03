import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faJs, faVuejs } from '@fortawesome/free-brands-svg-icons'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import VueFab from 'vue-float-action-button'
import VModal from 'vue-js-modal'
import Datetime from 'vue-datetime'



// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)
 
Vue.use(VModal)
 
Vue.use(VueFab, /* {
  ----------------------
  // opitons Optional iconfont icon or MaterialIcons
  iconType: 'MaterialDesign'
  // iconType: 'iconfont'
} */)

library.add(faSpinner,fab,faPlus);

library.add(faUserSecret, faJs, faVuejs)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})

Vue.use(require('vue-moment'));

axios.defaults.baseURL = 'http://50aff656.ap.ngrok.io'
 
Vue.use(ElementUI)
Vue.use(VueAxios, axios)


Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
