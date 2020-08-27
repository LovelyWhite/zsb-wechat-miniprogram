//app.js
import {
  promisifyAll
} from 'miniprogram-api-promise';

App({
  wxp:{},
  towxml: require('/towxml/index'),
  globalData: {},
  onLaunch: function () {
    promisifyAll(wx, this.wxp)
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