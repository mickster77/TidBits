import firebase from 'firebase'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import { store } from './store/store'



Vue.config.productionTip = false

let app = ''
// This is a git test.
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store: store,
      render: h => h(App)
    }).$mount('#app')
  }
});

// Old implementation::  The above implementation keeps user signed in after refresh
// new Vue({
//   router,
//   store: store,
//   render: h => h(App)
// }).$mount('#app')
