// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// Element 的引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// index.js可以省略
// import router from './route/index.js'
import router from './route'
import '../src/assets/css/index.css'

Vue.use(ElementUI)

// 简化URL
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 简化导入axios
import axios from 'axios'
Vue.prototype.$http = axios

// 拦截器
axios.interceptors.request.use(
  config => {
    // 因为每个请求都会执行该拦截器，所以，就可以在请求拦截器中，统一添加 Authorization 这个请求头
    // 而不需要分别在每个请求中，单独添加
    // console.log('request', config)
    config.headers.Authorization = localStorage.getItem('token')

    // 注意：一定要返回config
    return config
  },
  error => {
    // 错误处理
    return Promise.reject(error)
  }
)
Vue.config.productionTip = false

// 下面这个注释不能删除
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 4 将路由和实例关联起来
  router
})
