var app = getApp()
var util = require('../../utils/util.js')

Page({

  data: {
    verifyPhone: '',
    vipCardNo: ''
  },
  onLoad: function (options) {
    var userInfo = app.getUserInfo();
    console.log("user" + userInfo.phone);
    if (userInfo.phone) {
      this.setData({
        verifyPhone: userInfo.phone
      })
    }
  },
  inputPhone: function (e) {
    this.setData({
      verifyPhone: e.detail.value
    })
  },
  inputCardNo: function (e) {
    this.setData({
      vipCardNo: e.detail.value
    })
  },
  bindVipPhone: function () {
    var that = this,
      verifyPhone = this.data.verifyPhone,
      vipCardNo = this.data.vipCardNo;
    console.log(verifyPhone + '+' + vipCardNo);
    if (!verifyPhone || !vipCardNo) {
      app.showModal({
        content: '手机号码和会员卡号为必填项'
      })
      return;
    }
    if (!util.isPhoneNumber(verifyPhone)) {
      app.showModal({
        content: '请输入正确的手机号码'
      })
      return;
    }
    app.showToast({
      title: '绑定成功',
      icon: 'success',
      success: function () {
        app.turnToPage('../vipCard/vipCard?cardNo=' + vipCardNo,false);
      }
    });
  }
})