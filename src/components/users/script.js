// 导入axios
import axios from 'axios'
export default {
  created() {
    this.getAllRoles()
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
      content: '',

      dialogFormVisible: false,
      adduserform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12个字符', trigger: 'blur' }
        ],
        //emial和mobile不是必填项, 所以required: true,删掉
        //Pattern
        email: [
          { message: 'email', trigger: 'blur' },
          {
            pattern: /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/,
            message: '邮箱错误',
            trigger: 'blur'
          }
        ],
        mobile: [
          { message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{4}$/,
            message: '手机号码错误',
            trigger: 'blur'
          }
        ]
      },
      editFormVisible: false,
      edituserform: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      assignFormVisible: false,
      assignuserform: {
        name: '',
        // 当前用户的角色id
        rid: -1,
        userId: -1
      },
      options: []
      // value: ''
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
    // 获取角色列表数据
    async getAllRoles() {
      const res = await this.$http.get('roles')
      // console.log('res', res)
      // 把res.data.data数组赋值给options
      this.options = res.data.data
    },
    // 1 封装获取列表数据
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
    // 2 查询功能
    search() {
      // console.log(this.content)
      // 调用封装好的方法
      this.getUserList(1, this.content)
    },
    // 3 删除功能
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
    // 4 修改用户状态功能
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
    },
    // 5 添加用户
    addUser() {
      this.dialogFormVisible = true
    },
    // 6 确定添加数据
    async ensureAdd() {
      // const res = await this.$refs.adduserform.validate()
      // console.log('res', res)// false时会报错==> 解决报错用try catch

      try {
        await this.$refs.adduserform.validate()
        const res = await this.$http.post('/users', this.adduserform)
        // console.log('res', res)
        const { meta } = res.data
        if (meta.status === 201) {
          this.message({
            type: 'success',
            message: meta.msg
          })
        }
      } catch (e) {}

      // 关闭对话框,重新渲染页面,重置表单
      this.dialogFormVisible = false
      this.getUserList(1, this.content)

      this.$refs.adduserform.resetFields()
    },
    // 7 关闭对话框 ==> 表单重置
    closeAddUsers() {
      this.$refs.adduserform.resetFields()
    },
    editUsers(row) {
      this.editFormVisible = true
      // console.log('row', row)
      for (var key in this.edituserform) {
        this.edituserform[key] = row[key]
      }
      // console.log(this.edituserform)
    },
    // 8 点击确定修改=>发送请求=>关闭弹框=>重新渲染页面
    async ensureEdit() {
      const { id, email, mobile } = this.edituserform
      const res = await this.$http.put(`/users/${id}`, {
        email,
        mobile
      })
      // console.log(res)
      this.editFormVisible = false
      this.getUserList(1, this.content)
    },
    // 9 点击分配角色
    /**
     * 1 弹出对话框
     * 2
     */
    async Assign(rowId) {
      this.assignFormVisible = true
      // console.log('rowId', rowId)
      const res = await this.$http.get(`users/${rowId}`)
      // console.log('res', res)
      let { username, id, rid } = res.data.data
      this.assignuserform.name = username
      rid = rid === -1 ? '' : rid
      this.assignuserform.rid = rid
      this.assignuserform.userId = id
    },
    // 10 点击确定, 进行角色授权 看文档1.37
    async updataRoles() {
      const { userId, rid } = this.assignuserform
      const res = await this.$http.put(`users/${userId}/role`, { rid })
      // console.log('res', res)
      // 关闭对话框
      this.assignFormVisible = false
      // 消息提示
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  }
}
