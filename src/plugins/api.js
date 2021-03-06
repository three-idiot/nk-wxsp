const host = 'https://s.le-99.xyz';
// const host = 'http://124.204.40.228:7093';
// const host = 'https://s.qqtlhnc.com';
// const host = 'http://192.168.89.13:8090';

export default {
  apiLogin: host + '/wxauto/login',

  apiBannerList: host + '/banner/getbannerlist',

  apiGoodsList: host + '/goods/getgoodspagelist',

  apiSaveUserInfo: host + '/wxauto/insertuser',

  apiGetGoodById: host + '/goods/getgoodbyid',

  apiUploadFile: host + '/image/uploadfile',

  apiCreateOrder: host + '/goods/insertgoodorder',

  apiGetOrderList: host + '/order/getorderlist',

  apiGetOrderById: host + '/order/getorderdetail',

  apiRegister: host + '/order/insertentertime',

  apiPayParams: host + '/pay/unifiedorder',

  apiPayCallback: host + '/pay/ordernotifyresult',

  apiDelayPrice: host + '/goods/getrenewprice',

  apiDelayOrder: host + '/goods/insertreneworder',

  apiDownLoadUrl: host + '/image/getimagepath',

  apiJianliUrl: host + '/image/getresumepath'
}