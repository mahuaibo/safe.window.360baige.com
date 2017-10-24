<template>
  <div class="index">
    <div class="appeal-content-message">
      <div class="appeal-content-message-info">申请基本资料 <span> <i>*</i>为必填信息</span></div>
    </div>
    <div class="appeal-content-remind">
      <p>首先，请填写账号主人的实名信息，全部资料仅用于账户的身份认证；</p>
      <p style="color: #ff1a1a;">不真实的资料会导致申请不通过，请您认真填写；</p>
      <p>百鸽公司不会泄露您的个人信息（详见百鸽<span>隐私条款</span>）。</p>
    </div>
    <el-form :model="appealForm" :rules="appealFormRules" ref="ruleForm" class="appeal-content-item-form">
      <el-form-item label="" prop="name" class="appealForm-item">
        <div class="appeal-content-inputLabel">真 实 姓 名</div>
        <div class="appeal-content-input">
          <el-input placeholder="请输入姓名" v-model="appealForm.name"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="" prop="phone" class="appealForm-item">
        <div class="appeal-content-inputLabel">详 细 地 址</div>
        <div class="appeal-content-input">
          <el-input placeholder="请输入手机号码" v-model="appealForm.phone"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="" prop="number" class="appealForm-item">
        <div class="appeal-content-inputLabel">证 件 类 型</div>
        <div class="appeal-content-input">
          <el-input placeholder="请输入身份证号/编码" v-model="appealForm.number"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="" prop="price" class="appealForm-item">
        <div class="appeal-content-inputLabel">证 件 号 码</div>
        <div class="appeal-content-input">
          <el-input placeholder="请输入应交金额" v-model="appealForm.price"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="" prop="remark" class="appealForm-item">
        <div class="appeal-content-inputLabel">手 机 号 码</div>
        <div class="appeal-content-input">
          <el-input placeholder="备注" v-model="appealForm.remark"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="" prop="remark">
        <el-button type="primary" class="appeal-content-submit" @click="submit()">提交</el-button>
        <div class="appeal-content-submitMessage">请您等待处理，稍后会有客服联系您，核对信息！</div>
      </el-form-item>
    </el-form>
    <el-dialog title="" :visible.sync="appeal"  :close-on-click-modal="false">
      <div class="close-button-vessel">
        <img src="../assets/close.png" class="close-button" @click="appeal=false"/>
      </div>
      <div style="margin: 20px;margin-top: 0px;">该功能暂未开放，如需帮助请联系客服 010-1111111</div>
    </el-dialog>
  </div>
</template>

<script>
  //  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
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
      return {
        appeal: true,
        appealForm: {
          name: null,
          phone: null,
          number: null,
          remark: null,
          price: null
        },
        appealFormRules: {}
      }
    },
    methods: {
      ...mapActions([
        'handleClick'
      ]),
      submit () {
        this.appeal = true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .appeal-content-item-form {
    .appealForm-item {
      margin-bottom: 24px;
      .el-input input {
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
<style lang="scss" scoped>
  .index {
    margin-top: 78px;
    padding-top: 32px;
    color: #9e9e9e;
    .appeal-content-message {
      color: #505050;
      height: 50px;
      line-height: 50px;
      margin: 0px 340px;
      background: #FAFAFA;
      text-align: left;
      .appeal-content-message-info {
        margin-left: 18px;
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
    .appeal-content-remind {
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
    .appeal-content-item-form {
      width: 388px;
      margin: 0 auto;
      padding-top: 30px;
      .appealForm-item {
        height: 38px;
        line-height: 38px;
        border: 1px solid #cadced;
        border-radius: 4px;
        background-color: #ffffff;
        .appeal-content-inputLabel {
          color: #505050;
          font-size: 14px;
          display: inline-block;
          margin: 0px 10px;
          height: 38px;
          line-height: 38px;
          float: left;
        }
        .appeal-content-input {
          width: 298px;
          float: right;
        }
      }
      .appeal-content-submit {
        width: 100%;
      }
      .appeal-content-submitMessage {
        color: #808080;
        font-size: 12px;
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
  }
</style>
