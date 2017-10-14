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
    need_login: false,
    page_router: 'page10000',
    page_form: 'none',
    list_compids_params: [],
    goods_compids_params: [],
    prevPage: 0,
    carouselGroupidsParams: [],
    relobj_auto: [],
    bbsCompIds: [],
    dynamicVesselComps: [],
    communityComps: [],
    franchiseeComps: [],
    cityLocationComps: [],
    seckillOnLoadCompidParam: [],
    requesting: false,
    requestNum: 1,
    modelChoose: [],
    modelChooseId: '',
    modelChooseName: [],
  },
  onLoad: function (e) {

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
    if (Object.keys(userInfo).length == 0 ) {
      app.goLogin({
        success: function () {
          if (app.isLogin() !== true) {
            app.turnToPage('../page10003/page10003', false);
          }else{
            app.turnToPage('/pages/userCenter/userCenter?from=userCenterEle');
          }
        }
      });
    } else {
      app.turnToPage('../page10003/page10003', false);
    }


  }
});