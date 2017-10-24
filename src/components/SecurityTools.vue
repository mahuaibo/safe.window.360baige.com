<template>
  <div class="index">
    <div class="securityTools-content">
      <div class="securityTools-content-menu menu1">
        <div class="securityTools-content-menu-image">
          <img src="../assets/Security_phone.png" width="40" height="40">
        </div>
        <div class="securityTools-content-menu-name">密保手机</div>
        <div class="securityTools-content-menu-number">手机号码：<span>{{ userData.phone }}</span></div>
        <div class="securityTools-content-menu-status">
          <span class="menu-status-text">使用状态：
            <span v-if="userData.phoneStatus==1">正常使用</span>
            <span v-else-if="userData.phoneStatus==0">未绑定</span>
          </span>
          <el-button type="text" class="menu-status-button">
            <span v-if="userData.phoneStatus==1" @click="unbindSecurityInfo('phone')">立即解绑</span>
            <span v-else @click="bindSecurityInfo(1)">立即绑定</span>
          </el-button>
        </div>
      </div>
      <div class="securityTools-content-menu menu2">
        <div class="securityTools-content-menu-image">
          <img src="../assets/Security_email.png" width="40" height="40">
        </div>
        <div class="securityTools-content-menu-name">密保邮箱</div>
        <div class="securityTools-content-menu-number">邮箱号码：<span>{{ userData.email }}</span></div>
        <div class="securityTools-content-menu-status">
          <span class="menu-status-text">使用状态：
            <span v-if="userData.emailStatus==1">正常使用</span>
            <span v-else-if="userData.emailStatus==0">未绑定</span>
          </span>
          <el-button type="text" class="menu-status-button">
            <span v-if="userData.emailStatus==1" @click="unbindSecurityInfo('email')">立即解绑</span>
            <span v-else @click="bindSecurityInfo(2)">立即绑定</span>
          </el-button>
        </div>
      </div>
      <div class="securityTools-content-menu menu3">
        <div class="securityTools-content-menu-image">
          <img src="../assets/Security_qq.png" width="40" height="40">
        </div>
        <div class="securityTools-content-menu-name">密保QQ</div>
        <div class="securityTools-content-menu-number"></div>
        <div class="securityTools-content-menu-status">
          <span class="menu-status-text">使用状态：
            <span v-if="userData.qqStatus==1">正常使用</span>
            <span v-else-if="userData.qqStatus==0">未绑定</span>
          </span>
          <el-button type="text" class="menu-status-button">
            <span v-if="userData.qqStatus==1" @click="unbindSecurityInfo('qq_open_id')">立即解绑</span>
            <span v-else @click="bindSecurityInfo(3)">立即绑定</span>
          </el-button>
        </div>
      </div>
      <div class="securityTools-content-menu menu4">
        <div class="securityTools-content-menu-image">
          <img src="../assets/Security_weixin.png" width="40" height="40">
        </div>
        <div class="securityTools-content-menu-name">密保微信</div>
        <div class="securityTools-content-menu-number"></div>
        <div class="securityTools-content-menu-status">
          <span class="menu-status-text">使用状态：
            <span v-if="userData.weChatStatus==1">正常使用</span>
            <span v-else-if="userData.weChatStatus==0">未绑定</span>
          </span>
          <el-button type="text" class="menu-status-button">
            <span v-if="userData.weChatStatus==1" @click="unbindSecurityInfo('wx_open_id')">立即解绑</span>
            <span v-else @click="bindSecurityInfo(4)">立即绑定</span>
          </el-button>
        </div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="securityInfoMode" :close-on-click-modal="false">
      <div class="close-button-vessel">
        <img src="../assets/close.png" class="close-button" @click="securityInfoMode=false"/>
      </div>
      <el-form ref="securityInfoForm" :model="securityInfoForm" class="securityInfo-form" :rules="securityInfoRules"
               v-if="securityInfoForm.bindType===1||securityInfoForm.bindType===2">
        <el-form-item label="" prop="account" class="securityInfo-form-item">
          <div class="securityInfo-form-inputLabel">{{ securityInfoForm.fieldName }}</div>
          <div class="securityInfo-form-input">
            <el-input placeholder="请输入..." type="password" v-model="securityInfoForm.account"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="" prop="code" class="securityInfo-form-item" style="padding-right: -100px;">
          <div class="securityInfo-form-inputLabel">验&nbsp;证&nbsp;码</div>
          <div class="securityInfo-form-verifyCode" @click="sendMessageCode()">获取验证码</div>
          <div class="securityInfo-form-input" style="width: 202px;">
            <el-input placeholder="请输入验证码" v-model="securityInfoForm.code"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="bind-button" @click="immediatelyBind('securityInfoForm')">立即绑定</el-button>
        </el-form-item>
      </el-form>
      <div v-else>
        <iframe class="bind-account-frame" :src="bindAccountUrl"></iframe>
      </div>
    </el-dialog>
    <el-dialog title="" :visible.sync="unbindSecurityInfoMode" :close-on-click-modal="false">
      <div class="close-button-vessel">
        <img src="../assets/close.png" class="close-button" @click="unbindSecurityInfoMode=false"/>
      </div>
      <el-form ref="unbindSecurityInfoForm" :model="unbindSecurityInfoForm" :rules="unbindSecurityInfoRules"
               class="unbindSecurityInfo-form">
        <el-form-item label="" prop="password" class="password-box-form-item">
          <div class="password-box-form-inputLabel">用 户 密 码</div>
          <div class="password-box-form-input">
            <el-input placeholder="请确认密码" type="password" v-model="unbindSecurityInfoForm.password"></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="bind-button" @click="immediatelyUnbind('unbindSecurityInfoForm')">立即解绑</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      if (localStorage.getItem('accessToken') === null) {
        this.publicParameters.loginModel = ''
      } else {
        this.getUserData()
      }
      if (document.getElementById('layout-container-background') === null) {
        window.onload = function () {
          document.getElementById('layout-container-background').style.opacity = '1'
        }
      } else {
        document.getElementById('layout-container-background').style.opacity = '1'
      }
    },
//    filters: {
//      unescape: function (html) {
//        return html
//          .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
//          .replace(/&nbsp;/g, ' ')
//      }
//    },
    computed: {
      ...mapGetters([
        'userData',
        'publicParameters'
      ])
    },
    data () {
      var phoneVerify = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error(' 请输入...'))
        } else {
          var objRegExp
          var promptInfo
          if (this.securityInfoForm.bindType === 1) {
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
      return {
        securityInfoModeTitle: null,
        securityInfoMode: false,
        securityInfoForm: {
          fieldName: '',
          bindType: null,
          account: null,
          code: null
        },
        securityInfoRules: {
          account: [{required: true, validator: phoneVerify, trigger: 'blur'}],
          code: [{required: true, validator: phoneCodeVerify, trigger: 'blur'}]
        },
        bindAccountUrl: '',
        unbindSecurityInfoMode: false,
        unbindSecurityInfoForm: {
          key: null,
          password: null
        },
        unbindSecurityInfoRules: {
          password: [
            {required: true, message: ' 请输入登陆密码！', trigger: 'blur'},
            {min: 6, max: 12, message: ' 长度在 6-20 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'getUserData'
      ]),
      bindSecurityInfo (type) {
        if (localStorage.getItem('accessToken') === null) {
          this.promptInfo('warning', '请登录后操作...')
          return
        }
        this.securityInfoForm.bindType = type
        if (type === 3) {
          this.bindAccountUrl = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101413897&redirect_uri=' + 'http://audit.dev.360baige.com' + '&state=qqLogin'
        }
        if (type === 4) {
          this.bindAccountUrl = 'https://open.weixin.qq.com/connect/qrconnect?appid=wxe8d941078f9472af&redirect_uri=' + 'http://audit.dev.360baige.com' + '&response_type=code&scope=snsapi_login&state=http://admin.window.360baige.com#wechat_redirect'
        }
        this.securityInfoMode = true
        this.securityInfoForm.fieldName = (type === 1) ? '手 机 号' : '邮 箱 号'
      },
      unbindSecurityInfo (type) {
        console.log(localStorage.getItem('accessToken'))
        if (localStorage.getItem('accessToken') === null) {
          this.promptInfo('warning', '请登录后操作...')
          return
        }
        this.unbindSecurityInfoForm.key = type
        this.unbindSecurityInfoMode = true
      },
      // 获取短信验证码
      sendMessageCode () {
        console.log(this.securityInfoForm.account)
        if (this.securityInfoForm.account === null) {
          this.promptInfo('warning', '请输入邮箱/手机号')
          return
        }
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.domain + '/user/sendMessageCode',
          params: {
            whether: 1,
            key: (this.securityInfoForm.bindType === '1') ? 'phone' : 'email',
            val: this.securityInfoForm.account
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {

          } else {
            current.promptInfo('warning', response.data.message)
            current.securityInfoForm.account = null
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 立即绑定
      immediatelyBind (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'POST',
              url: this.publicParameters.domain + '/user/bindOrUnbind',
              params: {
                accessToken: localStorage.getItem('accessToken'),
                key: (this.securityInfoForm.bindType === '1') ? 'phone' : 'email',
                val: this.securityInfoForm.account
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                current.getUserData()
                current.unbindSecurityInfoForm.password = null
                current.unbindSecurityInfoMode = false
              } else {
                current.promptInfo('warning', response.data.message)
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
      // 立即解除绑定
      immediatelyUnbind (formName) {
        console.log(formName)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'POST',
              url: this.publicParameters.domain + '/user/bindOrUnbind',
              params: {
                bindType: 2,
                accessToken: localStorage.getItem('accessToken'),
                password: this.unbindSecurityInfoForm.password,
                key: this.unbindSecurityInfoForm.key,
                val: ''
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                current.getUserData()
                current.unbindSecurityInfoForm.password = null
                current.unbindSecurityInfoMode = false
              } else {
                current.promptInfo('warning', response.data.message)
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
      promptInfo (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>
<style lang="scss">
  .password-box-form-item, .securityInfo-form-item {
    padding-bottom: 30px;
    .password-box-form-input, .securityInfo-form-input {
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

  .layout-container-background {
    opacity: 1;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .index {
    margin-top: 78px;
    padding-top: 32px;
    .securityTools-content {
      color: #505050;
      margin: 0 auto;
      text-align: left;
      .securityTools-content-menu {
        float: left;
        height: 246px;
        width: 364px;
        background: #FAFAFA;
        font-size: 14px;
        .securityTools-content-menu-image {
          text-align: center;
          width: 364px;
          height: 40px !important;
          display: inline-table; //主要是这个属性
          padding-top: 50px;
        }
        .securityTools-content-menu-name {
          text-align: center;
          padding-top: 11px;
          padding-bottom: 16px;
          margin: 0px 26px;
          font-size: 16px;
          color: #505050;
          border-bottom: 1px solid #f0f0f0;
        }
        .securityTools-content-menu-number {
          margin-left: 40px;
          margin-top: 15px;
        }
        .securityTools-content-menu-status {
          color: #505050;
          margin-left: 40px;
          margin-top: 12px;
          .menu-status-button {
            text-align: right;
            margin-left: 108px;
            font-size: 12px !important;
            color: #31a7ff !important;
          }
        }
      }
      .menu1, .menu3 {
        margin-left: 340px;
        margin-right: 34px;
      }
      .menu1, .menu2 {
        margin-bottom: 34px;
      }
    }
    .close-button-vessel {
      text-align: right;
      .close-button {
        width: 10px;
        height: 10px;
        margin: 15px 15px 0px 0px;
        cursor: pointer;
      }
    }
    .bind-account-frame {
      width: 380px;
      height: 320px;
      border: 0px;
    }
    .securityInfo-form {
      .securityInfo-form-item {
        width: 388px;
        margin: 0 auto;
        margin-bottom: 30px;
        height: 38px;
        line-height: 38px;
        border: 1px solid #cadced;
        border-radius: 4px;
        background-color: #ffffff;
        .securityInfo-form-inputLabel {
          color: #505050;
          font-size: 14px;
          display: inline-block;
          margin: 0px 10px;
          height: 38px;
          line-height: 38px;
          float: left;
        }
        .securityInfo-form-input {
          width: 298px;
          float: right;
        }
        .securityInfo-form-verifyCode {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          display: inline-block;
          width: 100px;
          height: 36px;
          float: right;
          background: #cadced;
          cursor: pointer;
          font-size: 12px;
        }
      }
      .bind-button {
        width: 298px;
        float: right;
        background-color: #31a7ff;
        color: #ffffff;
        border: 0px solid #ffffff;
      }
    }
    .unbindSecurityInfo-form {
      .password-box-form-item {
        width: 388px;
        margin: 0 auto;
        margin-bottom: 30px;
        height: 38px;
        line-height: 38px;
        border: 1px solid #cadced;
        border-radius: 4px;
        background-color: #ffffff;
        .password-box-form-inputLabel {
          color: #505050;
          font-size: 14px;
          display: inline-block;
          margin: 0px 10px;
          height: 38px;
          line-height: 38px;
          float: left;
        }
        .password-box-form-input {
          width: 298px;
          float: right;
        }
      }
      .bind-button {
        width: 314px;
        float: right;
        background-color: #31a7ff;
        color: #ffffff;
        border: 0px solid #ffffff;
      }
    }
  }
</style>
