// index.js就是路径到组件的映射

// 1 下载路由==> 导入路由
import Router from 'vue-router'
import Vue from 'vue'

// 2 导入两个组件
import Home from '../components/home/Home.vue'
import Login from '../components/login/Login.vue'
// 导入home的两个组件
import Users from '../components/users/Users.vue'
import Roles from '../components/roles/Roles.vue'
// 导入权限列表
import Rights from '../components/rights/Rights.vue'

// 3 将路由通过use注册到Vue中,即告诉Vue要使用Router
Vue.use(Router)

// 5 创建路由实例
const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login },

    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
      ]
    }
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
