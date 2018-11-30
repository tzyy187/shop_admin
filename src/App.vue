<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- app.vue是根组件,是出口,main.js是入口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
}
</style>
