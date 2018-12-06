<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <img src="../../assets/images/下载.png" alt="">
        </el-col>
        <el-col :span="6" class="title">
          电商后台管理系统
        </el-col>
        <el-col :span="4" class="desc">
          欢迎上海前端27期星曜会员
          <a href="javascript:;" class="logout" @click.prevent="logout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="2" class="home-aside" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true" index="1"    :unique-opened = 'true'>

          <!-- 第一个菜单： -->
          <el-submenu index="/users">
            <!-- 一级菜单标题： -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

            <!-- 二级菜单： -->
            <el-menu-item index="/users">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 第二个菜单： -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 第三个菜单： -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span slot="title">分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span slot="title">商品分类</span>
            </el-menu-item>
          </el-submenu>

          <!-- 第四个菜单： -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 第五个菜单： -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span slot="title">数据报表</span>
            </el-menu-item>
          </el-submenu>

        </el-menu>

      </el-aside>
      <el-main>
        <!-- 子路由出口 -->
        <!-- 在main.js中配置嵌套路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    // 点击退出,弹出确认框
    logout() {
      this.$confirm('您是否确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          // 清除localStorage 中的token
          localStorage.removeItem('token')
          // 跳回登录页
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>
<style lang="less">
.home-container {
  height: 100%;
  width: 100%;
  background-color: #eaeef1;
  .home-header {
    background-color: #b3c1cd;
    padding: 0;
    line-height: 60px;
    .title {
      font-size: 20px;
      color: #fff;
      font-weight: bolder;
      font-size: 25px;
    }
    .desc {
      color: #000;
      font-weight: bolder;
      min-width: 240px;
    }
    .logout {
      color: orange;
    }
  }
  .home-aside {
    height: 100%;
  }
}
</style>


