export  default {
  10: {
    btns: [{action: 'pay', name: '去付款'}],
    statusText: '待付款'
  },
  20: {
    btns: [{action: 'progress', name: '查进展'}],
    statusText: '待送签'
  },
  30: {
    btns: [{action: 'progress', name: '查进展'}],
    statusText: '已送签'
  },
  40: {
    btns: [{action: 'register', name: '去登记'}, {action: 'download', name: '去下载'}],
    statusText: '已签发'
  },
  41: {
    btns: [],
    statusText: '已拒签'
  },
  50: {
    btns: [{action: 'checkEntryDate', name: '查看入境日期'}, {action: 'download', name: '去下载'}],
    statusText: '已登记'
  },
  60: {
    btns: [{action: 'delay', name: '去延期'}],
    statusText: '已过期'
  },
  70: {
    btns: [],
    statusText: '已取消'
  }
}