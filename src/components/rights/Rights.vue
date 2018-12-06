<template>
  <div class="rights">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb ">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 列表 -->
    <el-table :data="rightsList" stripe style="width: 100%">
      <el-table-column type="index" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="180">
      </el-table-column>
      <el-table-column prop="level" label="层级">
        <!-- 作用域插槽 -->
        <template slot-scope="scope">

          <span v-if="scope.row.level === '0' ">一级</span>
          <span v-else-if="scope.row.level === '1' ">二级</span>
          <span v-else>三级</span>

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
export default {
  data() {
    return {
      rightsList: [
        {
          authName: '',
          path: '',
          level: ''
        }
      ]
    }
  },
  async created() {
    const res = await this.$http.get(`rights/list`)
    // console.log('res:', res)
    this.rightsList = res.data.data
  },
  methods: {
    indexMethod(index) {
      return index
    }
  }
}
</script>
<style scoped>
.Breadcrumb {
  height: 40px;
  background-color: #d4dae0;
  line-height: 40px;
  font-size: 16px;
  padding-left: 20px;
}
</style>


