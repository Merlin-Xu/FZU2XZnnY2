var app = getApp()
var util = require('../../utils/util.js')

Page({

  data: {
    verifyPhone: '',
    vipCardNo: '',
    lastName: ''
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
  inputLastName: function (e) {
    this.setData({
      lastName: e.detail.value
    })
  },
  bindLoyalT: function () {
    var that = this,
      verifyPhone = this.data.verifyPhone,
      vipCardNo = this.data.vipCardNo,
      lastName = this.data.lastName;
    if (!verifyPhone || !vipCardNo || !lastName) {
      app.showModal({
        content: '请填写完整的信息'
      })
      return;
    }
    if (!util.isPhoneNumber(verifyPhone) && !util.isEmail(verifyPhone)) {
      app.showModal({
        content: '请输入正确的手机号码或邮箱'
      })
      return;
    }
    app.showToast({
      title: '绑定成功',
      icon: 'success',
      success: function () {
        app.turnToPage('../vipCard/vipCard?cardNo=' + vipCardNo, false);
      }
    });
  },

  bindScan: function(e){
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res.result)
        this.setData({
          vipCardNo: res.result
        })
      }
    })
  }
})