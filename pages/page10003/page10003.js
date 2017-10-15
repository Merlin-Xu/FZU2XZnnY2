var app = getApp(),
  animationShowHeight = 300,
  animationShowWidth = 300;

var pageData = {
  data: {
    cardDetail: {
      appName: 'DFS miniP',
      logoUrl: 'http:\/\/img.weiye.me\/zcimgdir\/album\/file_59dcb625a6d5d.gif',
      duration: '无限期',
      cartNo: '',
      level: '普通用户',
      animationData: "",
      showModalStatus: false
    },
    "carousel1": {
      "type": "carousel",
      "style": "opacity:1;margin-left:auto;",
      "content": [
        {
          "pic": "http://img.weiye.me/zcimgdir/album/file_5721778f3f244.jpg",
          "customFeature": [],
          "content": "",
          "parentCompid": "carousel1",
          "style": ""
        },
        {
          "pic": "http://img.weiye.me/zcimgdir/album/file_5721778eeba97.jpg",
          "customFeature": [],
          "content": "",
          "parentCompid": "carousel1",
          "style": ""
        }
      ],
      "customFeature": {
        "carouselgroupId": null
      },
      "animations": [],
      "page_form": "",
      "compId": "carousel1"
    },
    userName: '',
    cardNo: '',
  },
  onLoad: function (e) {
    let that = this;
    app.getStorage({
      key: 'vipNo',
      success: function (res) {
        that.setData({
          'cardDetail.cardNo': (res.data || 0).toString().replace(/(\d)(?=(?:\d{4})+$)/g, '$1 ')
        });
      },
      fail: function (res) {
        if (option && option.vipNo)
          that.setData({ 'cardDetail.cardNo': res });
        else {
          app.showModal({
            title: "提示",
            content: "您并没有绑定会员卡",
            confirmText: "绑定",
            showCancel: true,
            cancelText: "取消",
            confirm: function (e) {
              app.reLaunch({ url: '../page10000/page10000' });
            }
          });

        }
      }
    });

  },
  bindTapVip: function (e) {
    app.getStorage({
      key: 'vipNo',
      success: function (res) {
        wx.navigateTo({
          url: '../vipCard/vipCard'
        });
      },
      fail: function (res) {
        app.showModal({
          title: "提示",
          content: "您并没有绑定会员卡",
          confirmText: "绑定",
          showCancel: true,
          cancelText: "取消",
          confirm: function (e) {
            app.reLaunch('../bindForm/bindForm');
          }
        });
      }
    });
  },
  tabhome: function (e) {
    wx.navigateBack({
      delta: 10,
    })
  },
  showModal: function () {
    // 显示遮罩层  
    let that = this;
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    that.animation = animation
    animation.translateY(animationShowHeight).step()
    that.setData({
      "cardDetail.animationData": animation.export(),
      "cardDetail.showModalStatus": true
    });

    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        "cardDetail.animationData": animation.export()
      })
    }.bind(that), 200);
  },
  hideModal: function () {
    // 隐藏遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation;
    animation.translateY(animationShowHeight).step()
    this.setData({
      "cardDetail.animationData": animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        "cardDetail.animationData": animation.export(),
        "cardDetail.showModalStatus": false
      })
    }.bind(this), 200)
  },
  onShow: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        animationShowHeight = res.windowHeight;
        animationShowWidth = res.windowWidth;
      }
    })
  }
};
Page(pageData);
