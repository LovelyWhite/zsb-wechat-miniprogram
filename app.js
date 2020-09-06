//app.js
import {
  promisifyAll
} from 'miniprogram-api-promise';

App({
  wxp: {},
  towxml: require('/towxml/index'),
  globalData: {},
  onLaunch: function () {
    promisifyAll(wx, this.wxp)
    console.log(wx.getStorageSync('token'));
    let _ts = this;
    this.wxp.requestWithToken = async function (url, d,method) {
      console.log(url, d)
      try {
        let result = await _ts.wxp.request({
          url: url,
          method: method,
          header: {
            "token": wx.getStorageSync('token')
          },
          data: d
        })
        let data = result.data;
        if (200 == data.code) {
          return data;
        }
        //token 失效
        else if (104 == data.code) {
          wx.setStorageSync('userInfo', null);
          wx.setStorageSync('token', null);
          wx.switchTab({
            url: "/pages/me/me"
          })
        } else {
          return data;
        }
      } catch (e) {
        console.log(e);
        return null;
      }
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
})