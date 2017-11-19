// import promise from 'es6-promise'
// promise.polyfill();
import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'

import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'

import './assets/stylus/main.styl'

import App from './App.vue'
import store from './store'

// 按需引入element-ui相关弹出
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = (options) => {
  options = Object.assign(options, {duration: 500})
  return Message(options)
}
Vue.prototype.$message.error = (err) => {
  var options = {
    message: err,
    duration: 500,
    type: 'error'
  }
  return Message(options)
}

Vue.use(VueRouter)

const Login = resolve => require(['./components/Login.vue'], resolve)
const Admin = resolve => require(['./components/Admin.vue'], resolve)
const routes = [
  {path: '/admin/login', component: Login, meta: {authPage: true}},
  {path: '/admin', component: Admin}, {
    path: '*',
    redirect: '/admin'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authPage) { //login
    console.log('login')
    if (store.state.auth.token) {
      next('/admin')
    }
    next()
  } else {
    console.log('admin')
    if (store.state.auth.token) {
      Axios.defaults.headers.common['Authorization'] = store.state.auth.token
      next()
    } else {
      console.log('无 token')
      next('/admin/login')
    }
  }
})

// 拦截token过期
Axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.data.error.indexOf('token') !== -1) {
    store.commit('DELETE_TOKEN')
  }
  return Promise.reject(error)
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
