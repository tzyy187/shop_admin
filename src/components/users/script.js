// 导入axios
import axios from 'axios'
export default {
  created() {
    this.getUserList()
    // axios
    //   .get('http://localhost:8888/api/private/v1/users', {
    //     params: {
    //       //查询参数
    //       query: '',
    //       //当前页码
    //       pagenum: 1,
    //       //每页显示条数
    //       pagesize: 3
    //     },
    //     headers: { Authorization: localStorage.getItem('token') }
    //   })
    //   .then(res => {
    //     console.log(res)
    //     if (res.data.meta.status === 200) {
    //       // 获取数据
    //       this.tableData = res.data.data.users
    //       // 获取总页码
    //       this.total = res.data.data.total
    //       //设置当前页
    //       this.pagenum = res.data.data.pagenum
    //     }
    //   })
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pagesize: 2,
      pagenum: 1,
      content: ''
    }
  },
  methods: {
    async getUserList(pagenum, query, pagesize) {
      const config = {
        params: {
          //查询参数
          query: query || '',
          //当前页码
          pagenum: pagenum || 1,
          //每页显示条数
          pagesize: pagesize || 2
        }
        // 已经在拦截器里面设置请求头了, 所以可以不写
        // headers: { Authorization: localStorage.getItem('token') }
      }
      // axios.get()的返回值就是一个promise对象
      const res = await axios.get('/users', config)
      const { data, meta } = res.data
      const { users, total, pagenum: curpage } = data
      // console.log(res)
      if (meta.status === 200) {
        // 获取数据
        this.tableData = users
        // 获取总页码
        this.total = total
        //设置当前页
        this.pagenum = curpage
      }
    },
    // 封装获取列表数据
    // getUserList(pagenum, query, pagesize) {
    //   axios
    //     .get('http://localhost:8888/api/private/v1/users', {
    //       params: {
    //         //查询参数
    //         query: query || '',
    //         //当前页码
    //         pagenum: pagenum || 1,
    //         //每页显示条数
    //         pagesize: pagesize || 2
    //       },
    //       headers: { Authorization: localStorage.getItem('token') }
    //     })
    //     .then(res => {
    //       // console.log(res)
    //       if (res.data.meta.status === 200) {
    //         // 获取数据
    //         this.tableData = res.data.data.users
    //         // 获取总页码
    //         this.total = res.data.data.total
    //         //设置当前页
    //         this.pagenum = res.data.data.pagenum
    //       }
    //     })
    // },
    changePage(page) {
      // console.log('改变页码', page)
      //在这里传的参数this.content是因为当在搜索内容的时候, 如果点击第二页的时候, 如果不传该参数的话,就会重新渲染页面, 变成3页了,
      this.getUserList(page, this.content)
    },
    // 查询功能
    search() {
      // console.log(this.content)
      // 调用封装好的方法
      this.getUserList(1, this.content)
    },
    // 删除功能
    async delUser(id) {
      console.log('id:', id)

      // ...................点击取消之后发现会报错.....................
      try {
        await this.$confirm('您确定删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await axios.delete(`/users/${id}`, {
          headers: { Authorization: localStorage.getItem('token') }
        })
        if (res.data.meta.status === 200) {
          // 删除成功 => 重新渲染
          this.getUserList(1, this.content)
        }
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      }

      // axios
      //   .delete(`/users/${id}`, {
      //     headers: { Authorization: localStorage.getItem('token') }
      //   })
      //   .then(res => {
      //     // console.log(res)
      //     // 发现此时返回的数据是meta: {msg: "无效token", status: 401}
      //     // 所以需要设置delete请求头 查axios文档 delete（url [，config]）
      //     if (res.data.meta.status === 200) {
      //       // 删除成功 => 重新渲染
      //       this.getUserList(1)
      //     }
      //   })
    },
    // 修改用户状态功能
    // changestatus(row) {
    //   // console.log('id:', id)
    //   // 发现又是无效token
    //   // put设置请求头的方式与之前不同
    //   // 第一个参数:地址
    //   // 第二个参数:传递给接口的数据
    //   // 第三个参数:配置对象
    //   axios
    //     .put(`users/${row.id}/state/${row.mg_state}`, null, {
    //       headers: {
    //         Authorization: localStorage.getItem('token')
    //       }
    //     })
    //     .then(res => {
    //       // console.log('res:', res)
    //       if (res.data.meta.status === 200) {
    //         this.$message({
    //           type: 'success',
    //           message: res.data.meta.msg
    //         })
    //       } else {
    //         this.$message({
    //           type: 'error',
    //           message: res.data.meta.msg
    //         })
    //       }
    //     })
    // }

    //................................同步书写异步操作..................................
    async changestatus(row) {
      // const res = await this.$http.put(
      //   `users/${row.id}/state/${row.mg_state}`,
      //   null,
      //   {
      //     headers: {
      //       Authorization: localStorage.getItem('token')
      //     }
      //   }
      // )
      // .............................简化请求头.......................................
      const res = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
      const { meta } = res.data
      // console.log('res:', res)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: meta.msg
        })
      } else {
        this.$message({
          type: 'error',
          message: meta.msg
        })
      }
    }
  }
}
