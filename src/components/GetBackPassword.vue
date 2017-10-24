<template>
  <div class="index">
    <div class="getBackPassword-head">
      <img src="../assets/one.png" class="getBackPassword-head-oneImg">
      <div class="getBackPassword-head-oneDiv"></div>
      <img src="../assets/two-1.png" class="getBackPassword-head-twoImg" v-if="twoImg==1">
      <img src="../assets/two.png" class="getBackPassword-head-twoImg" v-else>
      <div class="getBackPassword-head-twoDiv"></div>
      <img src="../assets/three-1.png" class="getBackPassword-head-threeImg" v-if="threeImg==1">
      <img src="../assets/three.png" class="getBackPassword-head-threeImg" v-else>
      <div class="getBackPassword-head-threeDiv"></div>
      <img src="../assets/four-1.png" class="getBackPassword-head-fourImg" v-if="fourImg==1">
      <img src="../assets/four.png" class="getBackPassword-head-fourImg" v-else>
    </div>
    <div class="getBackPassword-content">
      <el-form :model="accountVerifyForm" :rules="accountVerifyRules" ref="accountVerifyForm"
               class="account-verify-form">
        <el-form-item label="" prop="name" class="account-verify-form-item">
          <div class="account-verify-form-inputLabel">账 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 号</div>
          <div class="account-verify-form-input">
            <el-input placeholder="请输入账号" v-model="accountVerifyForm.name"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="" prop="code" class="account-verify-form-item" style="padding-right: -100px;">
          <div class="account-verify-form-inputLabel">验 &nbsp;证&nbsp; 码</div>
          <div class="account-verify-form-verifyCode" @click="createCode()">{{ verifyCode }}</div>
          <div class="account-verify-form-input" style="width: 200px;">
            <el-input placeholder="请输入验证码" v-model="accountVerifyForm.code"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="" prop="remark">
          <el-button type="primary" class="account-verify-form-submit" @click="accountSubmit('accountVerifyForm')">
            <span>下一步</span>
          </el-button>
        </el-form-item>
      </el-form>
      <el-form :model="phoneVerifyForm" :rules="phoneVerifyRules" ref="phoneVerifyForm" class="phone-verify-form"
               style="display: none;">
        <el-form-item label="" prop="phone" class="phone-verify-form-item">
          <div class="phone-verify-form-inputLabel">
            <select class="phone-verify-form-inputLabel-select" v-model="secondType">
              <option value="1">邮 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 箱</option>
              <option value="2">手 &nbsp;机&nbsp; 号 </option>
            </select>
          </div>
          <div class="phone-verify-form-input">
            <el-input placeholder="请输入..." v-model="phoneVerifyForm.phone"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="" prop="code" class="phone-verify-form-item" style="padding-right: -100px;">
          <div class="phone-verify-form-inputLabel">验&nbsp;&nbsp;证&nbsp;&nbsp;码</div>
          <div class="phone-verify-form-verifyCode" @click="getVerifyCode()">获取验证码</div>
          <div class="phone-verify-form-input" style="width: 202px;">
            <el-input placeholder="请输入验证码" v-model="phoneVerifyForm.code"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="" prop="remark">
          <el-button type="primary" class="phone-verify-form-submit" @click="secondSubmit('phoneVerifyForm')">
            <span>下一步</span>
          </el-button>
        </el-form-item>
      </el-form>
      <el-form :model="passwordVerifyForm" :rules="passwordVerifyRules" ref="passwordVerifyForm"
               class="password-verify-form" style="display: none;">
        <el-form-item label="" prop="password" class="password-verify-form-item">
          <div class="password-verify-form-inputLabel">密 &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 码</div>
          <div class="password-verify-form-input">
            <el-input placeholder="请输新密码" type="password" v-model="passwordVerifyForm.password"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="" prop="verifyPwd" class="password-verify-form-item">
          <div class="password-verify-form-inputLabel">确 认 密 码</div>
          <div class="password-verify-form-input">
            <el-input placeholder="请确认密码" type="password" v-model="passwordVerifyForm.verifyPwd"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="" prop="remark">
          <el-button type="primary" class="password-verify-form-submit" @click="passwordSubmit('passwordVerifyForm')">
            <span>下一步</span>
          </el-button>
        </el-form-item>
      </el-form>
      <div class="getBackPassword-content-message" style="display: none;">
        <img src="../assets/success.png" width="24">
        <span>您的新密码已设置成功！</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    // 初始化数据
    created () {
      this.createCode()
      if (document.getElementById('layout-container-background') === null) {
        window.onload = function () {
          document.getElementById('layout-container-background').style.opacity = '1'
        }
      } else {
        document.getElementById('layout-container-background').style.opacity = '1'
      }
    },
    // 页面加载后执行
    mounted () {
      var getBackPasswordSteps = localStorage.getItem('getBackPasswordSteps')
      if (getBackPasswordSteps === '2') {
        this.twoImg = 2
        this.setShowForm('none', 'block', 'none', 'none')
      } else if (getBackPasswordSteps === '3') {
        this.twoImg = this.threeImg = 2
        this.setShowForm('none', 'none', 'block', 'none')
      } else if (getBackPasswordSteps === '4') {
        this.twoImg = this.threeImg = this.fourImg = 2
        this.setShowForm('none', 'none', 'none', 'block')
      }
    },
    computed: {
      ...mapGetters([
        'publicParameters'
      ])
    },
    data () {
      var passwordVerify = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号...'))
        } else {
          callback()
        }
      }
      var codeVerify = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码...'))
        } else if (value.toLowerCase().trim() !== this.verifyCode.toLowerCase()) {
          callback(new Error('验证码错误请重新输入!'))
          this.createCode()
          this.accountVerifyForm.code = ' '
        } else {
          callback()
        }
      }
      var phoneVerify = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error(' 请输入...'))
        } else {
          var objRegExp
          var promptInfo
          if (this.secondType === '1') {
            objRegExp = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/ // 邮箱验证正则
            promptInfo = '邮箱号码格式错误！'
          } else {
            objRegExp = /^1[34578]\d{9}$/ // 手机号码验证正则
            promptInfo = '手机号码格式错误！'
          }
          if (!objRegExp.test(value)) {
            callback(new Error(promptInfo))
          }
          callback()
        }
      }
      var phoneCodeVerify = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error(' 请输入验证码！'))
        } else {
          callback()
        }
      }
      var verifyPwdVerify = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error(' 请再次输入密码！'))
        } else if (value !== this.passwordVerifyForm.password) {
          callback(new Error(' 输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        twoImg: 1,
        threeImg: 1,
        fourImg: 1,
        verifyCode: '',
        secondType: '1',
        accountVerifyForm: {
          name: '',
          code: ''
        },
        accountVerifyRules: {
          name: [{required: true, validator: passwordVerify, trigger: 'blur'}],
          code: [{required: true, validator: codeVerify, trigger: 'blur'}]
        },
        secondPartPlaceholder: '',
        phoneVerifyForm: {
          phone: '',
          code: ''
        },
        options: [{
          value: '1',
          label: '手机号码'
        }, {
          value: '2',
          label: '邮箱'
        }],
        value: '',
        phoneVerifyRules: {
          phone: [{required: true, validator: phoneVerify, trigger: 'blur'}],
          code: [{required: true, validator: phoneCodeVerify, trigger: 'blur'}]
        },
        passwordVerifyForm: {
          password: '',
          verifyPwd: ''
        },
        passwordVerifyRules: {
          password: [
            {required: true, message: ' 请输入密码！建议使用字母、数字和符号两种及以上的组合,6-20个字符', trigger: 'blur'},
            {min: 6, max: 12, message: ' 长度在 6-20 个字符', trigger: 'blur'}
          ],
          verifyPwd: [{required: true, validator: verifyPwdVerify, trigger: 'blur'}]
        }
      }
    },
    methods: {
      ...mapActions([]),
      // 更新文字验证码
      createCode () {
        var code = ''
        var codeLength = 4
        var random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g',
          'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r',
          'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z']
        for (var i = 0; i < codeLength; i++) {
          var index = Math.floor(Math.random() * 62)
          code += random[index]
        }
        this.verifyCode = code
      },
      // 显示表单
      setShowForm (accountStatus, phoneStatus, passwordStatus, getBackPasswordStatus) {
        document.getElementsByClassName('account-verify-form')[0].style.display = accountStatus
        document.getElementsByClassName('phone-verify-form')[0].style.display = phoneStatus
        document.getElementsByClassName('password-verify-form')[0].style.display = passwordStatus
        document.getElementsByClassName('getBackPassword-content-message')[0].style.display = getBackPasswordStatus
      },
      // 账号验证
      accountSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'POST',
              url: this.publicParameters.domain + '/user/existKey',
              params: {
                key: 'username',
                val: this.accountVerifyForm.name
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                current.twoImg = 2
                current.setShowForm('none', 'block', 'none', 'none')
                localStorage.setItem('getBackPasswordSteps', 2)
                localStorage.setItem('userId', response.data.data.userId)
              } else {
                current.promptInfo('warning', response.data.message)
                current.accountVerifyForm = {}
              }
            }).catch(function (error) {
              console.log(error)
            })
          } else {
            console.log('submit error')
            return false
          }
        })
      },
      // 获取短信验证码
      getVerifyCode () {
        if (this.phoneVerifyForm.phone === '') {
          this.promptInfo('warning', '请输入邮箱/手机号')
          return
        }
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.domain + '/user/sendMessageCode',
          params: {
            userId: localStorage.getItem('userId'),
            key: (this.secondType === '1') ? 'email' : 'phone',
            val: this.phoneVerifyForm.phone
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {

          } else {
            current.promptInfo('warning', response.data.message)
            current.phoneVerifyForm = {}
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 手机号或邮箱验证
      secondSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 验证码正确性
//            var current = this
//            axios({
//              method: 'POST',
//              url: this.publicParameters.domain + '/user/existKey',
//              params: {
//                key: (this.secondType === '1') ? 'email' : 'phone',
//                val: this.phoneVerifyForm.phone
//              }
//            }).then(function (response) {
//              console.log(response.data)
//              if (response.data.code === '200') {
//
//              } else {
//                current.promptInfo('warning', response.data.message)
//                current.phoneVerifyForm = {}
//              }
//            }).catch(function (error) {
//              console.log(error)
//            })
            this.twoImg = this.threeImg = 2
            this.setShowForm('none', 'none', 'block', 'none')
            localStorage.setItem('getBackPasswordSteps', 3)
          } else {
            console.log('submit error')
            return false
          }
        })
      },
      // 修改密码
      passwordSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            var params
            if (localStorage.getItem('accessToken') === null) {
              params = {
                modifyType: 0,
                userId: localStorage.getItem('userId'),
                password: this.passwordVerifyForm.password
              }
            } else {
              params = {
                modifyType: 1,
                accessToken: localStorage.getItem('accessToken'),
                password: this.passwordVerifyForm.password
              }
            }
            console.log(params)
            axios({
              method: 'POST',
              url: this.publicParameters.domain + '/user/resetPassword',
              params: params
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                current.twoImg = current.threeImg = current.fourImg = 2
                current.setShowForm('none', 'none', 'none', 'block')
                localStorage.setItem('getBackPasswordSteps', 4)
//                localStorage.clear()
//                current.publicParameters.headType = 0
//                document.getElementById('loginFrame').style.display = 'table'
                current.promptInfo('success', '密码重置成功！')
              } else {
                current.promptInfo('warning', response.data.message)
                current.phoneVerifyForm = {}
              }
            }).catch(function (error) {
              console.log(error)
            })
          } else {
            console.log('submit error')
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
  .account-verify-form-item, .phone-verify-form-item, .password-verify-form-item {
    padding-bottom: 30px;
    .account-verify-form-input, .phone-verify-form-input, .password-verify-form-input {
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
  }
</style>
<style lang="scss" scoped>
  #code {
    font-family: Arial;
    font-style: italic;
    font-weight: bold;
    border: 0;
    letter-spacing: 2px;
    color: blue;
  }

  .index {
    margin-top: 78px;
    text-align: left;
    .getBackPassword-head {
      background: #FAFAFA;
      padding: 40px 0px;
      img {
        height: 40px;
        width: 40px;
        margin: 0px 12px;
      }
      div {
        display: inline-table;
        width: 160px;
        height: 2px;
        margin-bottom: 19px;
        background: #e6e6e6;
      }
      .getBackPassword-head-oneDiv {
        display: inline-table;
        width: 160px;
        height: 2px;
        margin-bottom: 19px;
        background: -webkit-linear-gradient(left, #00A0FF, #0cb4fb, #e6e6e6); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #00A0FF, #0cb4fb, #e6e6e6); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #00A0FF, #0cb4fb, #e6e6e6); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #00A0FF, #0cb4fb, #e6e6e6); /* 标准的语法（必须放在最后） */
      }
      .getBackPassword-head-oneImg {
        margin-left: 355px;
      }
    }
    .getBackPassword-content {
      padding-top: 40px;
      .account-verify-form, .phone-verify-form, .password-verify-form {
        text-align: center;
      }
      .account-verify-form-item, .phone-verify-form-item, .password-verify-form-item {
        width: 388px;
        margin: 0 auto;
        margin-bottom: 30px;
        height: 38px;
        line-height: 38px;
        border: 1px solid #cadced;
        border-radius: 4px;
        background-color: #ffffff;
      }

      .account-verify-form-inputLabel, .phone-verify-form-inputLabel, .password-verify-form-inputLabel {
        color: #505050;
        font-size: 14px;
        display: inline-block;
        margin: 0px 10px;
        height: 38px;
        line-height: 38px;
        float: left;
      }
      .phone-verify-form-inputLabel-select {
        width: 65px;
        height: 34px;
        border: none;
        background: #ffffff;
        font-size: 14px;
        font-weight: 400;
        color: #505050;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: transparent;
        border: none;
        outline: none;
      }
      .account-verify-form-input, .phone-verify-form-input {
        width: 300px;
        float: right;
      }
      .password-verify-form-input {
        width: 298px;
        float: right;
      }
      .account-verify-form-verifyCode {
        display: inline-block;
        width: 100px;
        height: 36px;
        float: right;
        background: #cadced;
        font-style: italic;
        letter-spacing: 3px;
        font-weight: bolder;
        cursor: pointer;
        font-family: "Songti SC";
        font-size: 18px;
        font-weight: 800;
      }
      .account-verify-form-verifyCode, .phone-verify-form-verifyCode {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .account-verify-form-submit, .phone-verify-form-submit, .password-verify-form-submit {
        width: 388px;
      }
      .phone-verify-form-verifyCode {
        display: inline-block;
        width: 100px;
        height: 36px;
        float: right;
        background: #cadced;
        cursor: pointer;
        font-size: 12px;
      }
      .getBackPassword-content-message {
        margin: 0 auto;
        text-align: center;
        img {
          vertical-align: middle;
        }
        color: #20a0ff;
        font-size: 16px;
      }
    }
  }
</style>
