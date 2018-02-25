import Vue from 'vue'
import { VueCoreAPI } from './plugins/VueCoreAPI'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(VueCoreAPI, {
  baseUrl: 'http://localhost:8000/api/',
  schemaUrl: 'http://localhost:8000/api/schema/'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
