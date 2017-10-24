<template>
  <div class="common-header">
    <div class="common-header-left">
      <img class="common-header-left-image" src="../assets/logo.png"/>
    </div>
    <div class="common-header-content">
      <ul id="menuList">
        <li ref="homePage" @click="handleClick('/homePage'),setStyle()">首页</li>
        <li ref="getBackPassword" @click="handleClick('/getBackPassword'),setStyle()">密码重置</li>
        <!--<li ref="modifyPassword" @click="handleClick('/modifyPassword'),setStyle()">修改密码</li>-->
        <li ref="securityTools" @click="handleClick('/securityTools'),setStyle()">密保工具</li>
        <li ref="accountAppeal" @click="handleClick('/accountAppeal'),setStyle()">账号申诉</li>
      </ul>
    </div>
    <div class="common-header-right">
      <div class="common-header-right-operation">
        <div v-if="publicParameters.headType==0">
          <span @click="openChildWindow">登陆</span>|
          <span @click="registerAccount">注册</span>
        </div>
        <div class="common-header-right-operation-head" v-else>
          <img :src="publicParameters.head" width="30" class="user-head">
          <div class="operating-menu">
            <div class="operating-menu-content">
              <div class="operating-menu-item" @mouseover="moveShow('userInfo')"
                   @mouseout="moutShow('userInfo')">
                <img class="operating-menu-item-logo" src="../assets/user_infor.png" v-if="userInfo==1"/>
                <img class="operating-menu-item-logo" src="../assets/user_infor2.png" v-else/>
                <label>{{ publicParameters.username }}</label>
              </div>
              <div class="operating-menu-item" @click="logout" @mouseover="moveShow('quit')"
                   @mouseout="moutShow('quit')">
                <img class="operating-menu-item-logo" src="../assets/quit.png" v-if="quit==1"/>
                <img class="operating-menu-item-logo" src="../assets/quit2.png" v-else/>
                <label>退出</label>
              </div>
            </div>
            <!--<s><i></i></s>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    mounted () {
      this.setStyle()
      var accessToken = localStorage.getItem('accessToken')
      if (accessToken === null || typeof (accessToken) === 'undefined') {
        this.publicParameters.headType = 0
      } else {
        this.publicParameters.headType = 1
        this.publicParameters.head = localStorage.getItem('head')
        this.publicParameters.username = localStorage.getItem('username')
      }
    },
    computed: {
      ...mapGetters([
        'userData',
        'publicParameters'
      ])
    },
    data () {
      return {
        userInfo: 1,
        quit: 1
      }
    },
    methods: {
      ...mapActions([
        'handleClick',
        'getUserData'
      ]),
      setStyle () {
        var hash = window.location.hash
        if (hash.indexOf('/homePage') >= 0) {
          this.$refs.homePage.style.backgroundColor = '#06396A'
          this.$refs.homePage.style.borderBottom = '4px solid #69df8a' // this.$refs.modifyPassword.style.borderBottom =
          this.$refs.getBackPassword.style.backgroundColor = this.$refs.accountAppeal.style.backgroundColor = this.$refs.securityTools.style.backgroundColor = ''
          this.$refs.getBackPassword.style.borderBottom = this.$refs.accountAppeal.style.borderBottom = this.$refs.securityTools.style.borderBottom = ''
        } else if (hash.indexOf('/getBackPassword') >= 0) {
          this.$refs.getBackPassword.style.backgroundColor = '#06396A'
          this.$refs.getBackPassword.style.borderBottom = '4px solid #69df8a'
          this.$refs.homePage.style.backgroundColor = this.$refs.accountAppeal.style.backgroundColor = this.$refs.securityTools.style.backgroundColor = ''
          this.$refs.homePage.style.borderBottom = this.$refs.accountAppeal.style.borderBottom = this.$refs.securityTools.style.borderBottom = ''
        } else if (hash.indexOf('/modifyPassword') >= 0 || hash.indexOf('/account/transactionDetail') >= 0) {
          this.$refs.modifyPassword.style.backgroundColor = '#06396A'
          this.$refs.modifyPassword.style.borderBottom = '4px solid #69df8a'
          this.$refs.homePage.style.backgroundColor = this.$refs.accountAppeal.style.backgroundColor = this.$refs.getBackPassword.style.backgroundColor = this.$refs.securityTools.style.backgroundColor = ''
          this.$refs.homePage.style.borderBottom = this.$refs.accountAppeal.style.borderBottom = this.$refs.getBackPassword.style.borderBottom = this.$refs.securityTools.style.borderBottom = ''
        } else if (hash.indexOf('/securityTools') >= 0) {
          this.$refs.securityTools.style.backgroundColor = '#06396A'
          this.$refs.securityTools.style.borderBottom = '4px solid #69df8a'
          this.$refs.homePage.style.backgroundColor = this.$refs.accountAppeal.style.backgroundColor = this.$refs.getBackPassword.style.backgroundColor = ''
          this.$refs.homePage.style.borderBottom = this.$refs.accountAppeal.style.borderBottom = this.$refs.getBackPassword.style.borderBottom = ''
          if (localStorage.getItem('accessToken') === null) {
            this.openChildWindow()

          }
        } else if (hash.indexOf('/accountAppeal') >= 0) {
          this.$refs.accountAppeal.style.backgroundColor = '#06396A'
          this.$refs.accountAppeal.style.borderBottom = '4px solid #69df8a'
          this.$refs.homePage.style.backgroundColor = this.$refs.securityTools.style.backgroundColor = this.$refs.getBackPassword.style.backgroundColor = ''
          this.$refs.homePage.style.borderBottom = this.$refs.securityTools.style.borderBottom = this.$refs.getBackPassword.style.borderBottom = ''
        }
      },
      // 移入menu
      moveShow (key) {
        if (key === 'userInfo') {
          this.userInfo = 2
        } else if (key === 'quit') {
          this.quit = 2
        }
      },
      // 移出menu
      moutShow (key) {
        if (key === 'userInfo') {
          this.userInfo = 1
        } else if (key === 'quit') {
          this.quit = 1
        }
      },
      openChildWindow () {
        document.getElementById('loginFrame').style.display = 'table'
        var current = this
        var timing = window.setInterval(function () {
          if (localStorage.getItem('accessToken') !== null || document.getElementById('loginFrame').style.display === 'none') {
            clearInterval(timing)
          }
          current.authorizeLogin(timing)
        }, 3000)
      },
      authorizeLogin (timing) {
        var current = this
        axios({
          method: 'POST',
          url: current.publicParameters.loginDomain + '/userPosition/authorize',
          params: {
            redirectUri: window.location.origin
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            localStorage.setItem('head', response.data.data.head)
            localStorage.setItem('username', response.data.data.username)
            localStorage.setItem('accessToken', response.data.data.accessToken)
            current.publicParameters.head = response.data.data.head
            current.publicParameters.username = response.data.data.username
            current.publicParameters.headType = 1
            document.getElementById('loginFrame').style.display = 'none'
            current.getUserData()
            clearInterval(timing)
          } else if (response.data.code === '700') {
            console.log('等待授权回调...')
          } else {
            current.promptInfo('error', response.data.message)
            document.getElementById('loginFrame').style.display = 'none'
            clearInterval(timing)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      logout () {
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          var current = this
          axios({
            method: 'POST',
            url: this.publicParameters.loginDomain + '/user/logout',
            params: {
              access_token: localStorage.getItem('accessTicket')
            }
          }).then(function (response) {
            console.log(response.data)
            if (response.data.code === '200') {
              localStorage.clear()
              current.userData.phone = current.userData.email = null
              current.userData.weChatStatus = current.userData.qqStatus = current.userData.phoneStatus = current.userData.emailStatus = 0
            }
            current.publicParameters.headType = 0
          }).catch(function (error) {
            console.log(error)
          })
        }).catch(() => {
          console.log('取消操作！')
        })
      },
      registerAccount () {
        window.open('http://admin.window.360baige.com/#/admin/register')
      },
      promptInfo (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .common-header {
    text-align: left;
    height: 78px;
    .common-header-left, .common-header-content, .common-header-right {
      height: 78px;
      line-height: 78px;
    }
    .common-header-right-operation {
      color: #fff;
      span {
        cursor: pointer;
      }
    }
    .common-header-right-operation-head {
      width: 76px;
      height: 78px;
      .user-head {
        margin-top: 24px;
        border-radius: 15px;
      }
    }
    .common-header-right-operation-head:hover {
      .operating-menu {
        display: block;
      }
    }
    .operating-menu {
      position: absolute;
      top: 78px;
      right: 192px;
      font-size: 14pt;
      min-height: 170px;
      min-width: 132px;
      text-align: left;
      display: none;
      .operating-menu-content {
        padding: 5px 0px 5px 0px;
        border: 1px solid #e9e9e9;
        border-radius: 5px;
        position: absolute;
        background-color: #ffffff;
        .operating-menu-item {
          cursor: pointer;
          font-size: 14px;
          color: #505050;
          width: 132px;
          height: 38px;
          line-height: 38px;
          padding-left: 18px;
          .operating-menu-item-logo {
            height: 16px;
            width: 16px;
            position: relative;
            top: 4px;
            margin-right: 12px;
          }
        }
        .operating-menu-item:hover {
          color: #ffffff;
          background-color: #31a7ff;
        }
      }
      /* s {
         position: absolute;
         top: -20px;
         right: 8px;
         border-color: transparent transparent #e9e9e9 transparent;
         border-style: dashed dashed solid dashed;
         border-width: 10px;
       }

       i {
         position: absolute;
         top: -9px;
         left: -10px;
         border-color: transparent transparent #ffffff transparent;
         border-style: dashed dashed solid dashed;
         border-width: 10px;
       }*/
    }
    .common-header-left {
      float: left;
      .common-header-left-image {
        padding-left: 192px;
        height: 38px;
        vertical-align: middle;
      }
    }
    .common-header-content {
      display: inline-flex;
      text-align: center;
      ul {
        list-style: none;
        margin: 0px;
        padding-left: 160px;
        li {
          cursor: pointer;
          color: #fff;
          float: left;
          width: 120px;
          height: 78px;
        }
        li:hover {
          background: #06396A;
          border-bottom: 4px solid #69df8a;
        }
      }
    }
    .common-header-right {
      text-align: center;
      float: right;
      margin-right: 192px;
    }
  }

</style>

