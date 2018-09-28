import wepy from 'wepy'

const errorToast = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}

const requestApi = (url, data = {}, token = '', method = 'GET') => {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wepy.request({
      url: url,
      data: data,
      method: method,
      header: {
        'userToken': token,
        'content-type': 'application/json',
        'cookie': wx.getStorageSync('setSession') ? wx.getStorageSync('setSession') : ''
      }
    }).then((res) => {
      wx.hideLoading()
      let _headerCode = res.header.key ? JSON.parse(res.header.key) : '';
      if (res && res.statusCode == 200) {
        if (res.header['Set-Cookie']) {
          wx.setStorageSync('setSession', res.header['Set-Cookie']);
        }
        if (_headerCode && _headerCode.code && ['1000', '1001', '1002', '1003', '1004', '1005', '1006'].includes(String(_headerCode.code))) {
          reject('reAuth');
        } else {
          if (res.data.code == 200) {
            resolve(res.data);
          } else {
            errorToast(res.data.msg);
          }
        }
      } else {
        errorToast(res.data.message);
        reject(res);
      }
    }).catch((err) => {
      wx.hideLoading()
      console.log(err);
    });
  });
}

const requestPostApi = (url, data = {}, token = '', config = {}) => {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  let _header = Object.assign({}, {
    'userToken': token,
    'content-type': 'application/x-www-form-urlencoded',
    'cookie': wx.getStorageSync('setSession') ? wx.getStorageSync('setSession') : ''
  }, config);
  return new Promise((resolve, reject) => {
    wepy.request({
      url: url,
      data: data,
      method: 'POST',
      header: _header
    }).then((res) => {
      wx.hideLoading()
      let _headerCode = res.header.key ? JSON.parse(res.header.key) : '';
      if (res && res.statusCode == 200) {
        if(res.header['Set-Cookie']) {
          wx.setStorageSync('setSession', res.header['Set-Cookie']);
        }
        // console.log('post get cookie：', wx.getStorageSync('setSession'));
        if (_headerCode && _headerCode.code && ['1000', '1001', '1002', '1003', '1004', '1005', '1006'].includes(String(_headerCode.code))) {
          reject('reAuth');
        } else {
          if (res.data.code == 200) {
            resolve(res.data);
          } else {
            errorToast(res.data.msg);
          }
        }
      } else {
        errorToast(res.data.message);
        reject(res);
      }
    }).catch((err) => {
      wx.hideLoading()
      console.log(err);
    });
  });
}

const buLing = (str) => {
  return String(str).length == 1 ? '0' + String(str) : String(str);
}

const formatDate = (datestr) => {
  let date = new Date(datestr.slice(0,-5));
  let o = {
    "y+": date.getFullYear(),
    "M+" : date.getMonth()+1, //月份
    "d+" : date.getDate(), //日
    "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
    "H+" : date.getHours(), //小时
    "m+" : date.getMinutes(), //分
    "s+" : date.getSeconds(), //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S" : date.getMilliseconds() //毫秒
  };
  o['M+'] < 10? o['M+'] = '0' + o['M+'] : o['M+'];
  o['d+'] < 10?  o['d+'] = '0' +  o['d+'] : o['d+'];
  o['H+'] < 10?  o['H+'] = '0' +  o['H+'] :  o['H+'];
  o['m+'] < 10? o['m+'] = '0' +o['m+'] : o['m+'];
  o['s+'] < 10? o['s+'] = '0' +o['s+'] : o['s+'];
  let result = o['y+']+ '-' + o['M+'] + '-' + o['d+'] + ' ' + o['H+'] + ':' + o['m+'] + ':' + o['s+'];
  return result;
}
/** 注意：这里不能乱用，因为之前后端技术不行，时间计算有8小时的误差，所以这里面有加上8小时的逻辑兼容后端 */
const getYYMMDD = (date) => {
  let _temp = new Date(date.split('.')[0].replace(/T/, ' ').replace(/-/g, '/'));
  _temp = new Date( new Date(_temp).getTime() + 8*3600*1000 );
  console.log('getYYMMDD: ', _temp);
  return _temp.getFullYear() + '/' + buLing((_temp.getMonth() + 1)) + '/' + buLing(_temp.getDate());
}

export default {
  requestApi,
  requestPostApi,
  buLing,
  formatDate,
  getYYMMDD
}