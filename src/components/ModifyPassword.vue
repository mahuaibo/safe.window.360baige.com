<template>
  <div class="index">
    <el-form :model="modifyPasswordForm" :rules="modifyPasswordRules" ref="modifyPasswordForm"
             class="modifyPwd-content-item-form">
      <el-form-item label="" prop="password" class="modifyPwdForm-item">
        <div class="modifyPwd-content-inputLabel">旧 &nbsp;&nbsp;密&nbsp;&nbsp; 码</div>
        <div class="modifyPwd-content-input">
          <el-input placeholder="请输入现在的密码" v-model="modifyPasswordForm.password"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="" prop="newPassword" class="modifyPwdForm-item">
        <div class="modifyPwd-content-inputLabel">新 &nbsp;&nbsp;密&nbsp;&nbsp; 码</div>
        <div class="modifyPwd-content-input">
          <el-input placeholder="请输入新密码" v-model="modifyPasswordForm.newPassword"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="" prop="verifyPwd" class="modifyPwdForm-item">
        <div class="modifyPwd-content-inputLabel">确 认 密 码</div>
        <div class="modifyPwd-content-input">
          <el-input placeholder="请确认密码" v-model="modifyPasswordForm.verifyPwd"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="" prop="remark">
        <el-button type="primary" class="modifyPwd-content-submit" @click="modifyPwd('modifyPasswordForm')">
          <span>修改</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      if (localStorage.getItem('accessToken') === null) {
        this.handleClick('/getBackPassword')
        var content = document.getElementById('menuList')
        content.getElementsByTagName('li')[1].style.backgroundColor = '#06396A'
        content.getElementsByTagName('li')[1].style.borderBottom = '4px solid #69df8a'
        content.getElementsByTagName('li')[2].style.backgroundColor = ''
        content.getElementsByTagName('li')[2].style.borderBottom = ''
      }
      if (document.getElementById('layout-container-background') === null) {
        window.onload = function () {
          document.getElementById('layout-container-background').style.opacity = '1'
        }
      } else {
        document.getElementById('layout-container-background').style.opacity = '1'
      }
    },
    computed: {
      ...mapGetters([
        'publicParameters'
      ])
    },
    data () {
      var passwordCons = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入确认密码...'))
        } else if (value !== this.modifyPasswordForm.newPassword) {
          callback(new Error('输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        modifyPasswordForm: {
          password: '',
          newPassword: '',
          verifyPwd: ''
        },
        modifyPasswordRules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ],
          verifyPwd: [
            {required: true, validator: passwordCons, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'handleClick'
      ]),
      modifyPwd (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'POST',
              url: this.publicParameters.domain + '/user/modifyPassword',
              params: {
                accessToken: localStorage.getItem('accessToken'),
                password: this.modifyPwd.pass,
                newPassword: this.modifyPwd.newPass
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                current.promptInfo('success', '密码修改成功！')
                current.publicParameters.modifyPwdDialog = false
              } else {
                current.promptInfo('error', '密码修改失败！')
              }
            }).catch(function (error) {
              console.log(error)
            })
            return true
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      promptInfo (type, info) {  // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .el-form-item {
    margin-bottom: 24px;
    .el-input__inner {
      height: 36px;
      border: 0px solid red;
      font-size: 15px;
      color: #333333;
      font-size: 12px;
      padding: 3px 0px;
      padding-left: 12px;
    }
  }

  .layout-container-background {
    opacity: 1;
  }
</style>
<style lang="scss" scoped>
  .index {
    margin-top: 78px;
    padding-top: 32px;
    color: #9e9e9e;
    .modifyPwd-content-message {
      color: #505050;
      height: 50px;
      line-height: 50px;
      margin: 0px 190px;
      background: #FAFAFA;
      text-align: left;
      .modifyPwd-content-message-info {
        margin-left: 92px;
        color: #505050;
        font-size: 14px;
        span {
          color: #808080;
          font-size: 12px;
          i {
            color: red;
          }
        }
      }
    }
    .modifyPwd-content-remind {
      color: #505050;
      padding-top: 32px;
      font-size: 14px;
      p {
        margin: 0px;
        span {
          color: #1896f4;
        }
      }
    }
    .modifyPwd-content-item-form {
      width: 388px;
      margin: 0 auto;
      padding-top: 30px;
      .modifyPwdForm-item {
        height: 38px;
        line-height: 38px;
        border: 1px solid #cadced;
        border-radius: 4px;
        background-color: #ffffff;
        .modifyPwd-content-inputLabel {
          color: #505050;
          font-size: 14px;
          display: inline-block;
          margin: 0px 10px;
          height: 38px;
          line-height: 38px;
          float: left;
        }
        .modifyPwd-content-input {
          width: 298px;
          float: right;
        }
      }
      .modifyPwd-content-submit {
        width: 100%;
      }
      .modifyPwd-content-submitMessage {
        color: #808080;
        font-size: 12px;
      }
    }
  }
</style>
