// 1 下载路由==> 导入路由
import Router from 'vue-router'
import Vue from 'vue'

// 2 导入两个组件
import Home from '../components/home/Home.vue'
import Login from '../components/login/Login.vue'

// 3 将路由通过use注册到Vue中
Vue.use(Router)

// 5 创建路由实例
const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

// 导出router
export default router
