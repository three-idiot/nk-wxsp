import util from './util'
import api from './api'

const handleActions = (context, action, item, source) => {
  switch (action) {
    case 'pay':
      context.$invoke('payment', 'requestPayParam', {
        type: '0',
        orderId: item.id, 
        price: item.lowVisaPrice + item.lowHelpPrice,
        orderNumber: item.orderNum
      });
      break;
    case 'progress':
      wx.navigateTo({
        url: 'signProcess?status=' + item.status
      });
      break;
    case 'delay':
      util.requestApi(api.apiDelayPrice, {
        orderId: item.id
      }, wx.getStorageSync('userToken')).then((priceRes) => {
        if (priceRes.code == 200) {
          console.log('续签价格返回成功：', priceRes.data);
          wx.showModal({
            title: '提示',
            content: '您确定延期吗？延期时长等于原签证的有效期。价格为'+ Number(priceRes.data)/100 +'元',
            cancelColor: '#B2B2B2',
            confirmColor: '#387DFF',
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                // console.log(item.id);
                util.requestPostApi(api.apiDelayOrder, {
                  orderId: item.id
                }, wx.getStorageSync('userToken')).then((res1) => {
                  if (res1.code == 200) {
                    console.log('延期接口返回成功：', res1.data);
                    if (source == 'list') {
                      context.requestGetOrderList();
                    } else if (source == 'detail') {
                      context.requestOrderById();
                    }
                    context.$invoke('payment', 'requestPayParam', {
                      type: '1',
                      orderId: res1.data, 
                      price: priceRes.data
                    });
                  }
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          });
        }
      });
      break;
    case 'register':
      console.log('自动触发选择日期');
      break;
    case 'download':
      util.requestApi(api.apiDownLoadUrl, {
        orderId: item.id
      }, wx.getStorageSync('userToken')).then((res1) => {
        // console.log('');
        if (res1.code == 200) {
          console.log('下载url返回成功：', res1.data);
          if (!res1.data) {
            wx.showToast({
              title: '获取图片失败',
              icon: 'success',
              duration: 2000
            })
            return;
          }
          wx.downloadFile({
            url: res1.data,
            header: {
              'userToken': wx.getStorageSync('userToken') ? wx.getStorageSync('userToken') : '',
              'cookie': wx.getStorageSync('setSession') ? wx.getStorageSync('setSession') : ''
            },
            success: function(res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success () {
                    wx.showToast({
                      title: '下载成功',
                      icon: 'success',
                      duration: 2000
                    })
                  }
                })
              }
            }
          })
        }
      });
      break;
    case 'checkEntryDate':
      wx.navigateTo({
        url: 'orderDetail?orderInfo=' + JSON.stringify(item)
      });
      break;
    default:
      break;
  }
}

export default handleActions