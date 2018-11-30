// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// Element 的引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './route'
import '../src/assets/css/index.css'
// index.js可以省略
// import router from './route/index'

Vue.use(ElementUI)

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
