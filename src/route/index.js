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

// 6 每个路由都会走index.js这个文件,所以把路由
router.beforeEach((to, from, next) => {
  // console.log('导航执行了')
  // console.log('to:', to)
  // console.log('from', from)
  if (to.path === '/login') {
    return next()
  }
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})

// 导出router,在main.js中导入
export default router
