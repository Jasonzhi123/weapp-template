import {
  config
} from '../config.js'
import tips from './tipsBox';

class HTTP {
  constructor() {
    this.baseRestUrl = config.api_blink_url
  }

  request({
    url,
    resolve,
    data = {},
    method = 'GET',
    bmtype =''
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method, bmtype)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET', bmtype) {
    let starttime = new Date().getTime();
    let endtime = undefined;
    const headers = {}
    if(wx.getStorageSync('token')){
      headers['token'] = wx.getStorageSync('token')
    }
    if (bmtype === 'formdata') {
      headers['content-type'] = 'multipart/form-data'
    } else if (bmtype === 'excel') {
      headers['content-type'] = 'application/vnd.ms-excel;charset=UTF-8'
    } else if (bmtype === 'form') {
      headers['content-type'] = 'application/x-www-form-urlencoded'
    } else {
      headers['content-type'] = 'application/json;charset=UTF-8'
    }
    wx.request({
      url: config.api_blink_url + url,
      method: method,
      data: data,
      header: headers,
      success: (res) => {
        endtime = new Date().getTime();
        console.warn('Info : ' + " Url : " + url + " Time : " + (endtime - starttime) / 1000 + "s");
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          if (res.data.type === 'tologin') {
            // tips.showWarning('提示', '登录失效')
            wx.setStorageSync('token', '')
            wx.redirectTo({
              url: '/pages/login/index',
            })
          } else {
            resolve(res.data)
          }
        } else {
          const error_code = res.data.error_code;
          console.log(error_code)
          reject()
        }
      },
      fail: (err) => {
        console.log(err)
        console.error('ERR: Args : ' + " Url : " + url + " Time : " + (endtime - starttime) / 1000 + "s");
        reject()
      }
    })
  }
}

export {
  HTTP
};