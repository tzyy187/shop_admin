<template>
  <el-row :gutter="10" type="flex" class="row-bg login" justify="center" align="middle">
    <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
      <div class="grid-content bg-purple">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-form" label-position="top">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script>
// 导入axios
import axios from 'axios'
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // formName 是个变量, 只能通过中括号语法获取值,ruleForm是传过来的参数,$refs[formName] 可以换成$refs.ruleForm

        // if (valid) {
        //   alert('submit!')
        // } else {
        //   console.log('error submit!!')
        //   return false
        // }
        // console.log(valid) // 登录成功, valid为true , 如果登录失败 , valid为false
        // console.log(this.$refs[formName])  相同的
        // console.log(this.$refs.ruleForm)
        if (!valid) {
          // 如果登录失败的话, 走if语句
          return false
        }

        // console.log(this.ruleForm) // 可以拿到用户名和密码

        // 如果登录成功 : 发送axios请求:下载axios=>导入axios
        axios
          .post('http://localhost:8888/api/private/v1/login', {
            username: this.ruleForm.username,
            password: this.ruleForm.password
          })
          .then(res => {
            console.log(res.data)
            if (res.data.meta.status === 200) {
              // 登录成功 => 跳到首页 => 注意：在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push方法的参数为：要跳转到的页面路径，与 路由规则 中的path匹配

              // 1 功能一 : 跳转页面
              this.$router.push('/home')
              // 2 功能二 : 显示弹框
              this.$message({
                message: '恭喜你，登录成功',
                type: 'success',
                duration: 1000
              })
              // 3 功能三 : 将token值存储到本地, 用于会话保持
              localStorage.setItem('token', res.data.data.token)
            } else {
              this.$message({
                message: '登录失败',
                type: 'warning',
                duration: 2000
              })
            }
          })
      })
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>


<style>
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
}
.login-form {
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
}
</style>
