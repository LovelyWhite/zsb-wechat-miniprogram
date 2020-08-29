//app.js
import {
  promisifyAll
} from 'miniprogram-api-promise';
import {
  API,
} from "./utils/util"
App({
  wxp: {},
  towxml: require('/towxml/index'),
  globalData: {
    loginData: null,
  },
  onLaunch: function () {
    promisifyAll(wx, this.wxp)
    let token = wx.getStorageSync('token');
    this.globalData.loginData = wx.getStorageSync('userInfo');
    if(token && this.globalData.loginData){
      console.log(this.globalData.loginData);
      this.wxp.request({
        url: API.findUserByOpenid,
        header: {
          token: token
        },
        data: {
          openid: this.globalData.loginData.openid
        }
      }).then(res => {
        let data = res.data;
        console.log(data);
        if(200 != data.code){
          this.globalData.loginData = null;
          wx.setStorageSync('userInfo',null);
        }
        else{
          wx.setStorageSync('token', data.object.token);
          wx.setStorageSync('userInfo', data.object.user);
        }
      }).catch(res => {
        console.log(res);
      })
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