var app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    verifyEmail: '',
    verifyPhone: '',
    vipCardNo: '',
    lastName: '',
    step: 2,
    newCode: '',
    newCodeBtnDisabled: false,
    newCodeStatus: '获取验证码',
    bindNewPhoneBtnDisabled: false,
    codeInterval: 60
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
  inputNewCode: function (e) {
    this.setData({
      newCode: e.detail.value
    })
  },
  bindLoyalT: function () {
    var that = this,
      verifyPhone = this.data.verifyPhone,
      verifyEmail = this.data.verifyEmail,
      vipCardNo = this.data.vipCardNo,
      lastName = this.data.lastName,
      newCode = this.data.newCode;
    if (!newCode) {
      app.showModal({
        content: '请输入验证码'
      })
      return;
    }

    app.sendRequest({
      url: '/index.php?r=AppData/VerifyPhone',
      mehtod: 'post',
      data: {
        code: newCode
      },
      success: function (res) {
        app.setUserInfoStorage({
          phone: verifyPhone
        });
        app.setStorage({ key: "vipNo", data: vipCardNo });
        if (verifyPhone)
          app.setStorage({ key: "phone", data: verifyPhone });
        if (verifyEmail)
          app.setStorage({ key: "email", data: verifyEmail });
        app.setStorage({ key: "lastName", data: lastName });
      },
      fail: function (res) {
        app.showModal({
          content: '绑定失败' + res.data
        })
      },
      complete: function () {
        that.setData({
          bindNewPhoneBtnDisabled: false
        })
      }
    });



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
  },
  nextStep: function (e) {
    console.log("binding");
    this.setData({
      step: 2
    });
    return;
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
    this.setData({
      step: 2
    })
  },
  sendCodeToNewPhone: function () {
    var that = this,
      verifyPhone = this.data.verifyPhone;
    console.log("enter");
    app.getStorage({
      key: 'session_key',
      success: function (res) {
        console.log('test' + res);
        if (res.data == '') {
          app.showModal({
            content: '未获取授权，验证码获取失败'
          })
          return;
        };
      }
    })

    if (!util.isPhoneNumber(verifyPhone)) {
      app.showModal({
        content: '请输入正确的手机号码'
      })
      return;
    }
    if (this.data.newCodeBtnDisabled) {
      return;
    }

    this.setData({
      newCodeStatus: '正在发送...',
      newCodeBtnDisabled: true
    })
    app.sendRequest({
      url: '/index.php?r=AppData/PhoneCode',
      success: function (res) {
        var second = that.data.codeInterval,
          interval;

        interval = setInterval(function () {
          if (second < 0) {
            clearInterval(interval);
            that.setData({
              newCodeStatus: '获取验证码',
              newCodeBtnDisabled: false
            })
          } else {
            that.setData({
              newCodeStatus: second + 's',
            })
            second--;
          }
        }, 1000);
      },
      complete: function () {
        that.setData({
          newCodeStatus: '获取验证码',
          newCodeBtnDisabled: false
        })
      }
    })
  },
  backStep: function (e) {
    console.log('backstep');
    this.setData({
      step: 1
    })
  }
})