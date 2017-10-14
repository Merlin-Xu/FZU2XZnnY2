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
    brandSelected: 0,
    storeSelected: 0,
    channelSelected: 0,
    newCode: '',
    step: 2,
    storeArr: ["不限",
      "\u0044\u0046\u0053\u592a\u9633\u5e7f\u573a\u5e97\uff08\u5c16\u6c99\u5480\u5e97\uff09", "\u0044\u0046\u0053\u534e\u61cb\u5e7f\u573a\u5e97", "\u9999\u6e2f\u0044\u0046\u0053\u94dc\u9523\u6e7e\u5e97\uff08\u0054\u5e7f\u573a\uff09"],
    brandArr: ["全部", "BURBERRY", "GUCCI", "FERRAGAMO", "施华洛世奇水晶", "雷朋", "万宝龙", "登喜路", "BALLY", "COACH", "TUMI", "CELINE(部分9折)", "LOEWE。GIVENCHY", "TORY BURCH", "马克·雅各布(Marc by Marc Jacobs）"],
    channelArr: ["不限", "短信", "电邮", "微信"],
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
        channel: options.channel,
        step:1
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
  inputNewCode: function (e) {
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
  bindBrandChange: function (e) {
    this.setData({
      brandSelected: e.detail.value
    })
  },
  bindStoreChange: function (e) {
    this.setData({
      storeSelected: e.detail.value
    })
  },
  bindChannelChange: function (e) {
    this.setData({
      channelSelected: e.detail.value
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
        let vipNo = Math.floor(Math.random() * 1000000000000);
        app.setStorage({ key: "vipNo", data: vipNo });
        app.setStorage({ key: "phone", data: verifyPhone });
        app.setStorage({ key: "email", data: verifyEmail });
        app.setStorage({ key: "lastName", data: name });
        that.setData({ step: 2 });
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
  backStep: function (e) {
    console.log('backstep');
    this.setData({
      step: 1
    })
  },
  back: function (e) {
    app.reLaunch({ url: '../page10000/page10000' });
  },
  signUpLoyalT: function (e) {
    console.log("sign");
    var brandArr = this.data.brandArr,
      storeArr = this.data.storeArr,
      channelArr = this.data.channelArr,
      brandSelected = this.data.brandSelected,
      storeSelected = this.data.storeSelected,
      channelSelected = this.data.channelSelected;
    app.setStorage({ key: "brandPre", data: brandArr[brandSelected] });
    app.setStorage({ key: "storePre", data: storeArr[storeSelected] });
    app.setStorage({ key: "channelPre", data: channelArr[channelSelected] });
    this.setData({ step: 3 });
  },
  viewCard: function (e) {
    app.reLaunch({ url: '../page10003/page10003' });
  }
})