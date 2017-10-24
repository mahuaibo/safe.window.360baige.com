<template>
  <div class="layout">
    <div class="layout-container">
      <div class="layout-container-background" id="layout-container-background"></div>
      <div class="layout-container-header">
        <common-header></common-header>
      </div>
      <div class="layout-container-wrapper">
        <div id="loginFrame">
          <div class="login-mask"></div>
          <div class="close-button-vessel">
            <img src="../assets/close.png" width="10" class="close-button" @click="closeLoginFrame">
          </div>
          <iframe class="login-frame" :src="dialogLoginUrl"></iframe>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonHeader from '@/components/Header'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    components: {CommonHeader},
    created () {
    },
    // 页面加载后执行
    mounted () {
      var iTop = (window.screen.height - 120 - 299) / 2 // 获得窗口的垂直位置
      var iLeft = (window.screen.width - 10 - 390) / 2 // 获得窗口的水平位置
      document.getElementsByClassName('login-frame')[0].style.position = 'absolute'
      document.getElementsByClassName('login-frame')[0].style.top = iTop + 'px'
      document.getElementsByClassName('login-frame')[0].style.left = iLeft + 'px'
      document.getElementsByClassName('close-button-vessel')[0].style.position = 'absolute'
      document.getElementsByClassName('close-button-vessel')[0].style.top = iTop + 5 + 'px'
      document.getElementsByClassName('close-button-vessel')[0].style.left = iLeft + 365 + 'px'
    },
    computed: {
      ...mapGetters([
        'publicParameters'
      ])
    },
    data () {
      return {
        dialogLoginUrl: 'http://localhost:8081/#/admin/dialogLogin'
      }
    },
    methods: {
      ...mapActions([]),
      closeLoginFrame () {
        document.getElementById('loginFrame').style.display = 'none'
        this.dialogLoginUrl = 'http://localhost:8081/#/admin/dialogLogin?a=' + Math.random()
      }
    }
  }

</script>

<style lang="scss">
  .el-dialog {
    top: 35% !important;
    width: 460px !important;
    border-radius: 4px;
    padding: 0px !important;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0px !important;
      .el-form {
        padding-left: 30px;
        padding-right: 40px;
        .el-input-group__prepend {
          border: 0px;
        }
        .el-input__inner {
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
      }
    }
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $color: #324157 !default;
  .layout {
    position: relative;
    background: #ffffff;
    height: 100vh;
    .layout-container {
      width: 100vw;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      -webkit-transition: -webkit-transform .3s ease-in-out, width .3s ease-in-out;
      -moz-transition: -moz-transform .3s ease-in-out, width .3s ease-in-out;
      -o-transition: -o-transform .3s ease-in-out, width .3s ease-in-out;
      transition: transform .3s ease-in-out, margin .3s ease-in-out;
      .layout-container-background {
        position: fixed;
        width: 100%;
        background-color: #002f5c;
        height: 78px;
        z-index: 990;
      }
      .layout-container-header {
        position: fixed;
        width: 100%;
        z-index: 990;
      }
      .layout-container-wrapper {
        height: calc(100vh - 78px);
        #loginFrame {
          display: none;
          .login-mask {
            width: 100vw;
            height: 100vh;
            background: #000;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 991;
            opacity: 0.3;
            filter: alpha(opacity=30);
          }
          .close-button-vessel {
            z-index: 1000;
          }
          .login-frame {
            background: #ffffff;
            margin: auto;
            width: 390px;
            height: 299px;
            border: 0px;
            z-index: 999;
          }
        }
      }
    }
  }
</style>
