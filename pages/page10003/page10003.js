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
      "style": "",
      "content": [
        {
          "customFeature": [],
          "content": "",
          "parentCompid": "carousel1",
          "style": "",
          "circleId": "circle1",
          "title": "总消费",
          "detail": "年度总消费",
          "count": "694",
          "fontColor": "#0bb"
        },
        {
          "customFeature": [],
          "content": "",
          "parentCompid": "carousel2",
          "style": "",
          "circleId": "circle2",
          "title": "等级金额",
          "detail": "升级至翡翠卡会籍之等级金额",
          "count": "2500",
          "fontColor": "#fc5"
        },
        {
          "customFeature": [],
          "content": "",
          "parentCompid": "carousel3",
          "style": "",
          "circleId": "circle3",
          "title": "积分结余",
          "detail": "300积分将于2019年12月到期",
          "count": "1300",
          "fontColor": "#e37"
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
  onLoad: function (option) {
    let that = this;
    app.getStorage({
      key: 'vipNo',
      success: function (res) {
        that.setData({
          'cardDetail.cardNo': (res.data || 0).toString().replace(/(\d)(?=(?:\d{4})+$)/g, '$1 '),
          cardNo: res.data
        });
      },
      fail: function (res) {
        if (option && option.vipNo) {
          that.setData({ 'cardDetail.cardNo': option.vipNo, cardNo: option.vipNo });
        } else {
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
    app.getStorage({
      key: 'lastName',
      success: function (res) {
        that.setData({
          userName: res.data
        })
      }
    });
  },
  userCenterTurnToPage: function (e) {
    app.userCenterTurnToPage(e);
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

  drawCircle: function (id, color, arc, end) {
    var context = wx.createCanvasContext(id)
    context.setStrokeStyle(color);
    context.setLineWidth(4);
    context.arc(100, 100, 90, Math.PI / 2, arc, end);
    context.setStrokeStyle(color);
    context.stroke();
    if(end){
      context.beginPath();
      context.setStrokeStyle(color);
      context.setLineWidth(4);
      context.arc(100, 100, 90, Math.PI / 2, Math.PI * 3 / 2);
      context.setStrokeStyle("gray");
      context.stroke();
      // context.beginPath()
      // context.arc(100, 0, 10, 0, 0 * Math.PI)
      // context.setFillStyle(color)
      // context.fill();
      context.beginPath()
      context.arc(100, 10, 5, 0, 2 * Math.PI)
      context.setFillStyle(color);
      context.fill()
    }
    context.draw();
  },

  onReady: function () {
    this.drawCircle('circle1', "#00b0b0", Math.PI * 5 / 2,false)
  },

  swipe: function (e) {
    switch (e.detail.current) {
      case 0:
        this.drawCircle('circle1', "#00b0b0", Math.PI * 5 / 2,false)
        break
      case 1:
        this.drawCircle('circle2', "#f0c050", Math.PI * 3 / 2, Math.PI * 1 / 2)
        break
      case 2:
        this.drawCircle('circle3', "#e03070", Math.PI * 5 / 2,false)
        break
    }
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
