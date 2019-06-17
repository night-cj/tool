<template>
  <div class="login wh">
    <div class="box">
      <h1>POMS 通行证</h1>
      <el-form :model="form" :rules="rules" ref="loginForm" class="form">
        <el-form-item prop="userName">
          <el-input v-model="form.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input
            v-model="form.userPassword"
            type="password"
            placeholder="密码"
          >
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >确 定</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { Login } from '@/request/api.js'
import { localStorage } from '@/utils'
export default {
  components: {},
  data () {
    return {
      form: {
        userName: '',
        userPassword: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await Login(this.form)
          if (res.status !== 0) return
          localStorage('Tool_Token', res.data[0].token)
          localStorage('Tool_Project', res.data[0].project)
          this.$store.dispatch('Login', res.data[0])
          this.$router.push({ path: '/' })
        } else {
          return false
        }
      })
    }
  },
  created () {

  },
  mounted () { }
}
</script>

<style lang="scss" scoped>
.login {
  background-color: #2d3a4c;
  .box {
    width: 30%;
    margin: 0 auto;
    padding-top: 12%;
    h1 {
      color: #eee;
      text-align: center;
      margin-bottom: 100px;
    }
    .form {
      width: 70%;
      margin: 0 auto;
    }
    .el-button {
      width: 100%;
      font-size: 20px;
      margin-top: 40px;
    }
  }
}
/deep/.el-input__inner {
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #fff;
  height: 50px;
}
</style>
