var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    cardId: '',
    birthday: '',
    gender: '',
    email: '',
    addr: '',
    country: '',
    phone: '',
    language: '',
    brand: '',
    store: '',
    contact: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var userInfo = app.getUserInfo();
    app.getStorage({
      key: 'vipNo',
      success: function (res) {
        console.log(res.data);
        that.setData({
          'cardId': (res.data || 0).toString().replace(/(\d)(?=(?:\d{4})+$)/g, '$1 ')
        });
      }
    });
    app.getStorage({
      key: 'lastName',
      success: function (res) {
        that.setData({
          'userName': res.data
        });
      }
    });
    app.getStorage({
      key: 'phone',
      success: function (res) {
        that.setData({
          'phone': res.data
        });
      },
      fail: function () {
        if (userInfo)
          that.setData({
            'phone': userInfo.phone
          });
      }
    });
    app.getStorage({
      key: 'email',
      success: function (res) {
        that.setData({
          'email': res.data
        });
      },
      fail: function () {
        if (userInfo)
          that.setData({
            'email': userInfo.email
          });
      }
    });
    app.getStorage({
      key: "brandPre",
      success: function (res) {
        that.setData({
          'brand': res.data
        });
      }
    });
    app.getStorage({
      key: "storePre",
      success: function (res) {
        that.setData({
          'store': res.data
        });
      }
    });
    app.getStorage({
      key: "channelPre",
      success: function (res) {
        that.setData({
          'contact': res.data
        });
      }
    });
    if (userInfo) {
      that.setData({
        'gender': userInfo.sex == 0 ? '男' : userInfo.sex == 1 ? '女' : '未知',
        'country': userInfo.country,
        'addr': userInfo.country + ',' + userInfo.province + ',' + userInfo.city
      });
    }
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

  }
})