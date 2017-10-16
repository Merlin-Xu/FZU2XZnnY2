
var app = getApp()
Page({
  data: {
    // 是否领取会员卡
    receiveCard: -1, // 默认不知道是否有领取
    // 卡片信息
    cardDetail: {
      appName: 'DFS miniP',
      logoUrl: 'http:\/\/img.weiye.me\/zcimgdir\/album\/file_59dcb625a6d5d.gif',
      duration: '无限期',
      cartNo: '',
      level: '普通用户'
    },
    cardOwner: {
      lastname: '',
      sex: '',
      phone: '',
      email: '',
      address: '',
      nickName: ''
    },
    // 会员权益
    vipRights: {
      freePostage: 0,
      discount: 0,
      giveCouponStr: '',
      integral: 0
    },
    vipNotice: {
      description: ''
    },
    // 个人积分
    vipPoints: {
      canUseIntegral: 0,
      totalIntegral: 0,
      consumeNum: 0,
    },
    // 联系我们
    vipContact: {
      appName: 'DFS miniP',
      phone: '无'
    },
    // 活动打开的详情
    activeItem: ''
  },
  onLoad: function (option) {
    let that = this;
    var userInfo = app.getUserInfo();
    app.getStorage({
      key: 'vipNo',
      success: function (res) {
        console.log(res.data);
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
      }
    });

    app.getStorage({
      key: 'lastName',
      success: function (res) {
        that.setData({
          'cardOwner.lastname': res.data
        });
      }
    });
    app.getStorage({
      key: 'phone',
      success: function (res) {
        that.setData({
          'cardOwner.phone': res.data
        });
      }
    });
    app.getStorage({
      key: 'email',
      success: function (res) {
        that.setData({
          'cardOwner.email': res.data
        });
      }
    });
    if (userInfo) {
      that.setData({
        'cardOwner.sex': userInfo.sex == 0 ? '男' : userInfo.sex == 1 ? '女' : '未知',
        'cardOwner.address': userInfo.country + ',' + userInfo.province + ',' + userInfo.city,
        'cardOwner.nickName': userInfo.nickname
      });
    }
    this.getVipInfo();
  },
  // onShow: function(){
  //   app.checkIfBindPhone();
  // },
  // 获取会员卡信息
  getVipInfo: function () {
    let that = this;
    // app.sendRequest({
    //   url: '/index.php?r=AppShop/GetVIPInfo',
    //   data: {
    //     'app_id': app.globalData.appId,
    //     'is_all': 1
    //   },
    //   success: function (res) {
    let res = { "data": { "app_name": "DFS 免税店", "logo": "http:\/\/img.weiye.me\/zcimgdir\/album\/file_59df82a3436d2.jpg", "title": "LoyalT Card", "background_type": "0", "background": "http://img.weiye.me/zcimgdir/thumb/t_150814187659e46b34e4985.jpg", "expire": "\u65e0\u9650\u671f", "is_vip": 1, "is_free_postage": "0", "discount": "8.00", "integral": "1000", "phone": "18524111216", "coupon_list": [{ "id": "8819", "name": "\u5168\u573a\u4e03\u6298", "num": "1" }], "description": "\u4efb\u610f\u95e8\u5e97\u5747\u53ef\u4eab\u7528", "consume_num": 0, "total_integral": "1000", "can_use_integral": "1000" } };
    let cardBackground = ''
    if (parseInt(res.data.background_type) == 0) {
      cardBackground = '#222 url() 0% 0% / 100% 100%';
    } else {
      cardBackground = res.data.background;
    }
    let giveCouponStr = '';
    if (res.data.is_vip != 0) {
      for (let i = 0; i < res.data.coupon_list.length; i++) {
        giveCouponStr = giveCouponStr + '免费赠送' + res.data.coupon_list[i].num + '张' + res.data.coupon_list[i].name + '的优惠券,';
      }
    }
    that.setData({
      'receiveCard': res.data.is_vip || 0,
      'cardDetail.appName': res.data.app_name,
      'cardDetail.logoUrl': res.data.logo,
      'cardDetail.duration': res.data.expire,
      'cardDetail.level': res.data.title,
      'cardDetail.cardBackground': cardBackground,
      'vipRights.discount': res.data.discount,
      'vipRights.giveCouponStr': giveCouponStr,
      'vipRights.integral': res.data.integral,
      'vipRights.freePostage': res.data.is_free_postage,
      'vipNotice.description': res.data.description,
      'vipPoints.canUseIntegral': res.data.can_use_integral,
      'vipPoints.totalIntegral': res.data.total_integral,
      'vipPoints.consumeNum': res.data.consume_num,
      'vipContact.appName': res.data.app_name,
      'vipContact.phone': res.data.phone
    });
    // }
    // });
  },
  // 展示对应内容
  showItemContent: function (event) {
    let that = this;
    let _item = event.currentTarget.dataset.item;
    if (that.data.activeItem == _item) {
      _item = '';
    }
    that.setData({
      'activeItem': _item
    });
  },
  unbindLoyalT: function (e) {
    app.removeStorage({ key: 'vipNo' });
    app.removeStorage({ key: 'phone' });
    app.removeStorage({ key: 'email' });
    app.removeStorage({ key: 'lastName' });
    app.turnToPage('../page10000/page10000', true);
  }
})
