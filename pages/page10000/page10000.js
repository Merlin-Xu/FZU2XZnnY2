var app = getApp();
Page({
  data: {
    data: {},
    carousel: {
      "content": [{
        "pic": "http:\/\/img.weiye.me\/zcimgdir\/album\/file_591558e0042bb.png"
      }, {
        "pic": "http:\/\/img.weiye.me\/zcimgdir\/album\/file_5919646682231.png"
      }]
    },
    popupDetails: {
      cardNo: '',
      animationShowHeight: 300,
      animationData: "",
      showModalStatus: false
    }
  },
  onLoad: function (e) {
    if (!app.isLogin()) {
      app.goLogin({
        success: function () {
          // app.turnToPage('/pages/userCenter/userCenter?from=userCenterEle');
        }
      });
    }
  },
  userCenterTurnToPage: function (e) {
    app.userCenterTurnToPage(e);
  },
  bindLoyalT: function (e) {
    app.getStorage({
      key: 'vipNo',
      success: function (res) {
        app.turnToPage('../vipCard/vipCard', false);
        return;
      },
      fail: function () {
        app.turnToPage('../bindForm/bindForm', false);
      }
    });
  },
  registerScan: function (e) {
    app.getStorage({
      key: 'vipNo',
      success: function (res) {
        app.turnToPage('../vipCard/vipCard', false);
        return;
      },
      fail: function () {
        app.scanCode({
          onlyFromCamera: true,
          success: function (res) {
            console.log(res);
            var shoppingMessage = JSON.parse(res.result),
              store = '',
              brand = '',
              channel = '';
            if (shoppingMessage.store) {
              store = shoppingMessage.store;
              brand = shoppingMessage.brand;
              channel = shoppingMessage.channel;
            }
            console.log(shoppingMessage);
            app.turnToPage('../registerForm/registerForm?store=' + store + '&brand=' + brand + '&channel=' + channel, false);
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }
    });

  },
  tabmine: function (e) {
    let userInfo = app.getUserInfo();
    if (Object.keys(userInfo).length == 0) {
      app.goLogin({
        success: function () {
          if (app.isLogin() !== true) {
            app.turnToPage('../page10003/page10003', false);
          } else {
            app.turnToPage('/pages/userCenter/userCenter?from=userCenterEle');
          }
        }
      });
    } else {
      app.turnToPage('../page10003/page10003', false);
    }

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
          cancelText: "首页",
          confirmColor: '#000',
          confirm: function (e) {
            app.reLaunch({ url: '../bindForm/bindForm' });
          },
          cancel: function (e) {
            app.reLaunch({ url: '../page10000/page10000' });
          }
        });
      }
    });
  },
  onShow: function (e) {
    app.onShowPopup(e);
  },
  showModal: function (e) {
    app.showComplexModal();
  },
  hideModal: function (e) {
    app.hideComplexModal();
  }
});