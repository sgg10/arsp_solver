import Vue from 'vue'

// * Plugins
// BootstrapVue
import './plugins/BootstrapVue'
// Vue Font Awesome
import './plugins/fontAwesome'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
