// pages/registerForm/registerForm.js
var app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    sex: "",
    verifyPhone: "",
    verifyEmail: "",
    country: "",
    brand: "",
    store: "",
    channel: "",
    newCode: '',
    newCodeBtnDisabled: false,
    newCodeStatus: '获取验证码',
    bindNewPhoneBtnDisabled: false,
    codeInterval: 60
  },
  onLoad: function (options) {

    var userInfo = app.getUserInfo();
    if (userInfo) {
      this.setData({
        country: userInfo.country,
        sex: userInfo.sex == 0 ? '男' : userInfo.sex == 1 ? '女' : '未知',
        verifyEmail: userInfo.email,
        verifyPhone: userInfo.phone
      })
    }
    if (options) {
      console.log(options);
      this.setData({
        brand: options.brand,
        store: options.store,
        channel: options.channel
      })
    }
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputPhone: function (e) {
    this.setData({
      verifyPhone: e.detail.value
    })
  },
  inputNewCode:function(e){
    this.setData({
      newCode: e.detail.value
    })
  },
  inputEmail: function (e) {
    this.setData({
      verifyEmail: e.detail.value
    })
  },
  inputCountry: function (e) {
    this.setData({
      country: e.detail.value
    })
  },
  inputBrand: function (e) {
    this.setData({
      brand: e.detail.value
    })
  },
  inputStore: function (e) {
    this.setData({
      store: e.detail.value
    })
  },
  inputChannel: function (e) {
    this.setData({
      channel: e.detail.value
    })
  },
  createCard: function (e) {
    var that = this,
      verifyPhone = this.data.verifyPhone,
      verifyEmail = this.data.verifyEmail,
      country = this.data.country,
      name = this.data.name,
      newCode = this.data.newCode;
    if ((!verifyPhone && !verifyEmail) || !name) {
      app.showModal({
        content: '请填写完整的信息'
      })
      return;
    }
    if (verifyPhone && !util.isPhoneNumber(verifyPhone)) {
      app.showModal({
        content: '请输入正确的手机号码'
      })
      return;
    }
    if (!newCode) {
      app.showModal({
        content: '请输入验证码'
      })
      return;
    }
    if (verifyEmail && !util.isEmail(verifyEmail)) {
      app.showModal({
        content: '请输入正确的邮箱'
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
        app.setStorage({ key: "vipNo", data: 'E0000001' });
        app.setStorage({ key: "phone", data: verifyPhone });
        app.setStorage({ key: "email", data: verifyEmail });
        app.setStorage({ key: "lastName", data: name });
        app.showToast({
          title: '创建成功',
          icon: 'success',
          success: function () {
            app.turnToPage('../vipCard/vipCard?cardNo=E0000001', true);
          }
        });
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

  },

  sendCodeToNewPhone: function () {
    var that = this,
      verifyPhone = this.data.verifyPhone;

    app.getStorage({
      key: 'session_key',
      success: function (res) {
        console.log(res);
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
  back: function (e) {
    app.turnBack();
  }
})