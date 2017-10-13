var app = getApp()
var util = require('../../utils/util.js')

Page({

  data: {
    verifyPhone: '',
    verifyEmail: '',
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
  inputEmail: function (e) {
    this.setData({
      verifyEmail: e.detail.value
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
      verifyEmail = this.data.verifyEmail,
      vipCardNo = this.data.vipCardNo,
      lastName = this.data.lastName;
    if ((!verifyPhone && !verifyEmail) || !vipCardNo) {
      app.showModal({
        content: '请填写完整的信息'
      })
      return;
    }
    if (!util.isloyalT(vipCardNo)) {
      app.showModal({
        content: '您输入的T会员卡号码并不正确,请检查后再试'
      });
      return;
    }
    if (verifyPhone && !util.isPhoneNumber(verifyPhone)) {
      app.showModal({
        content: '请输入正确的手机号码'
      })
      return;
    }
    if (verifyEmail && !util.isEmail(verifyEmail)) {
      app.showModal({
        content: '请输入正确的邮箱'
      })
      return;
    }
    app.showToast({
      title: '绑定成功',
      icon: 'success',
      success: function () {
        app.setStorage({ key: "vipNo", data: vipCardNo });
        if (verifyPhone)
          app.setStorage({ key: "phone", data: verifyPhone });
        if (verifyEmail)
          app.setStorage({ key: "email", data: verifyEmail });
        app.setStorage({ key: "lastName", data: lastName });
        app.turnToPage('../vipCard/vipCard?cardNo=' + vipCardNo, true);
      }
    });
  },

  bindScan: function (e) {
    app.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res.result)
        this.setData({
          vipCardNo: res.result
        })
      }
    })
  },
  back: function (e) {
    app.turnBack();
  }
})