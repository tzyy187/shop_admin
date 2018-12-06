// /+**+enter ===>
/**
 *
 */
export default {
  data() {
    return {
      isShowAssign: false,
      curRoleId: -1,
      rolesList: [
        {
          roleName: '',
          roleDesc: '',
          level: ''
        }
      ],
      showAllChecked: [
        // {
        //   id: 1,
        //   label: '一级 1',
        //   children: [
        //     {
        //       id: 4,
        //       label: '二级 1-1',
        //       children: [
        //         {
        //           id: 9,
        //           label: '三级 1-1-1'
        //         },
        //         {
        //           id: 10,
        //           label: '三级 1-1-2'
        //         }
        //       ]
        //     }
        //   ]
        // }
      ],
      // 原本是用lable:lable来指定使用对象中的哪个属性来提供名字,但是现在返回的数据是用authName来指定的
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  async created() {
    this.getAllRights()
    this.getTree()
  },
  methods: {
    // 0 获取数据
    async getAllRights() {
      const res = await this.$http.get(`roles`)
      this.rolesList = res.data.data
    },
    // 渲染权限列表tree,
    async getTree() {
      const res = await this.$http.get(`rights/tree`)
      // console.log(res)
      this.showAllChecked = res.data.data
    },
    // 1 编辑
    editRights() {},
    // 2 删除
    delRights() {},
    // 3 索引号
    getIndex(index) {
      // 此处的index，表示：从 0 开始的索引号
      return index
    },
    // 4 删除Tags  参考接口1.5.7 删除角色指定权限
    async closeTags(roleId, rightId) {
      // console.log('角色id:', roleId, '权限id:', rightId)
      const res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
      // console.log('删除成功', res)
      // 重新刷新页面
      this.getAllRights()
      // 提示用户删除成功
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    },
    // 5 分配权限 参考接口1.4.1所有权限列表
    // 思路 : 展示弹框 => 将所有的权限都展示到弹框里面 => 将选中的弹框展开 => 展示当前角色拥有的权限并展示出来
    // 把获取tree封装起来, 放到created中,表示已进入到页面中就获取tree, 而不是没点击一次, 获取一次
    showAssign(arg) {
      this.getTree()
      // console.log(arg.id)
      // 点击弹出分配权限的Dialog对话框
      this.isShowAssign = true
      // 在此处保存一下当前角色的id
      this.curRoleId = arg.id
      // 设置当前角色拥有的权限, 并选中
      // console.log(this.$refs.tree) // undefined
      // this.$refs.tree.setCheckedKeys([0])// 发现报错, 说setCheckedKeys为undefined,

      // 获取不到this.$refs.tree的原因:
      // 因为点击权限分配后弹出的框Tree不是写死的,是通过isShowAssign为false和true来控制显示与隐藏的,为true的时候=>显示,false=> 隐藏,内部的tree也没有被渲染, 所以拿不到tree
      // 如何拿到tree呢?
      // vue中是异步dom更新, 所以组件没有被立即渲染出来, 所以无法直接拿到组件,但是可以通过$nextTick()中的回调函数来获取更新后的组件(DOM)
      this.$nextTick(() => {
        // this.$refs.tree.setCheckedKeys([103])
        // 但是103 不能写死, 是个变量
        const checkedKeys = []
        // 遍历一级菜单
        arg.children.forEach(l1 => {
          // 遍历二级菜单
          l1.children.forEach(l2 => {
            // 遍历三级菜单
            l2.children.forEach(l3 => {
              // console.log('l3:', l3)
              // 把遍历出来的三级菜单添加到空数组中,
              checkedKeys.push(l3.id)
            })
          })
        })
        //
        this.$refs.tree.setCheckedKeys(checkedKeys)
      })
    },
    // 6 点击tree页面上的确定按钮, 看文档 1.5.6角色授权
    // 思路: 注册点击事件 => 获取当前页面上所有被选中的单选框 => 点击确定后发送请求 =>
    async enSureAdd() {
      // 获取当前角色的id
      // console.log(this.$refs.tree.getCheckedKeys())// 全选中的
      // 我们不仅要获取到全选中的三级id, 还要获取到半选中的二级一级id
      // 1 全选中的id
      const checkedAll = this.$refs.tree.getCheckedKeys()
      // console.log('全选中:', checkedAll)
      // 2 半选中的id 文档中有方法
      const checkedHalf = this.$refs.tree.getHalfCheckedKeys()
      // console.log('半选中:', checkedHalf)
      // 将两个数组合并到一起发送给后台
      // const checked = checkedAll.concat(checkedHalf)
      // console.log('所有选中的', checked)
      // 3 更简洁的将两个数组合并到一起(ES6)
      const checked = [...checkedAll, ...checkedHalf]
      // 3.1 因为接口文档要求要以 , 分割的权限 ID 列表所以将合并后的数组join一下
      const strChecked = checked.join(',')
      // console.log('curRoleId', curRoleId)
      // 4 发送请求
      const res = await this.$http.post(`roles/${this.curRoleId}/rights`, {
        rids: strChecked
      })
      console.log('res :', res)
      // 5 关闭对话框, 刷新数据
      this.isShowAssign = false
      this.getAllRights()
      // 6 提示成功
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      }
    }
  }
}
