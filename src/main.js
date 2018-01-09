// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/config'
import Vue from 'vue'
import App from './App'
// import App from './Sheets'
import router from './routers'
// import store from '@/store'

// QUESTION - ??
Vue.config.productionTip = false

window.onSheetApiLoaded = () => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    // store, // Vuex Store - QUESTION - why is this not available to all child components as `this.$store`?
    router: router,
    template: '<App/>',
    components: { App }
  })

  // console.log(App.methods.auth())
  App.methods.auth()
}
