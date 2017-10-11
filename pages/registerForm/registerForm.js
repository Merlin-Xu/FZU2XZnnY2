// pages/registerForm/registerForm.js
var app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    verifyPhone: "",
    country: "",
    brand: "",
    store: "",
    channel: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
      country = this.data.country,
      name = this.data.name,
      brand = this.data.brand,
      store = this.data.store,
      channel = this.data.channel;
    if (!verifyPhone || !country || !name) {
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
    app.setStorage({ key: "vipNo", data: 'E0000001' });
    app.setStorage({ key: "phoneEmail", data: verifyPhone });
    app.setStorage({ key: "lastName", data: name });
    app.setStorage({ key: "brand", data: brand });
    app.setStorage({ key: "store", data: store });
    app.setStorage({ key: "channel", data: channel });
    app.showToast({
      title: '创建成功',
      icon: 'success',
      success: function () {
        app.turnToPage('../vipCard/vipCard?cardNo=E0000001', true);
      }
    });
  }
})