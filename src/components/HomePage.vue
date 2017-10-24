<template>
  <div class="home-page">
    <div class="home-page-content">
      <div class="home-page-content-slogan1">百鸽安全  只为安心</div>
      <div class="home-page-content-slogan2">BaiGe安全中心为您的百鸽在线生活提供安全护航，让你获得最新的安全咨询</div>
      <div class="home-page-content-loginButton">登陆了解 >></div>
      <div class="home-page-content-menu">
        <div class="menu-item menu-item1">
          <img class="menu-item-img" src="../assets/security.png" width="40" height="40">
          <div class="menu-item-name">密保工具</div>
          <div class="menu-item-desc">设定密保手机号码和邮箱账号</div>
        </div>
        <div class="menu-item menu-item2">
          <img class="menu-item-img" src="../assets/modify-password.png" width="40" height="40">
          <div class="menu-item-name">修改密码</div>
          <div class="menu-item-desc">修改密码登陆后修改您的账号密码</div>
        </div>
        <div class="menu-item menu-item3">
          <img class="menu-item-img" src="../assets/find-password.png" width="40" height="40">
          <div class="menu-item-name">找回密码</div>
          <div class="menu-item-desc">如果忘记密码，可以通过密保手机号码或邮箱账号找回密码</div>
        </div>
        <div class="menu-item">
          <img class="menu-item-img" src="../assets/account-appeal.png" width="40" height="40">
          <div class="menu-item-name">账号申诉</div>
          <div class="menu-item-desc">通过填写资料、等待客服人员核对信息处理，找回面</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      if (document.getElementById('layout-container-background') === null) {
        window.onload = function () {
          document.getElementById('layout-container-background').style.opacity = '0.6'
        }
      } else {
        document.getElementById('layout-container-background').style.opacity = '0.6'
      }
    },
    computed: {
      ...mapGetters([
        'publicParameters'
      ])
    },
    methods: {
      ...mapActions([])
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .home-page {
    color: #fff;
    min-height: 780px;
    background-image: url('../assets/background-img.jpeg');
    background-size: cover; /* 将背景图片等比缩放填满整个容器 */
    .home-page-content {
      text-align: center;
      .home-page-content-slogan1 {
        padding-top: 173px;
        font-size: 72px;
      }
      .home-page-content-slogan2 {
        margin-top: 12px;
        font-size: 16px;
      }
      .home-page-content-loginButton {
        font-size: 36px;
        margin: 0 auto;
        margin-top: 82px;
        padding: 8px 0px;
        border: 2px solid #fff;
        border-radius: 40px;
        width: 290px;
        height: 70px;
        cursor: pointer;
      }
      .home-page-content-menu {
        width: 1018px;
        height: 154px;
        margin: 0 auto;
        margin-top: 108px;
        .menu-item {
          height: 154px;
          width: 235px;
          background-color: rgba(255, 255, 255, 0.6);
          /*background: #fff;*/
          /*opacity: 0.6;*/
          float: left;
          .menu-item-img {
            position: relative;
            margin-top: 20px;
          }
          .menu-item-name {
            position: relative;
            color: #1e1e1e;
            font-size: 16px;
            margin-top: 8px;
          }
          .menu-item-desc {
            position: relative;
            color: #535353;
            font-size: 14px;
            margin-top: 6px;
          }
        }
        .menu-item1, .menu-item2, .menu-item3 {
          margin-right: 26px;
        }
      }
    }
  }
</style>
