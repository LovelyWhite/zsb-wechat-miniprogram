const {
  API
} = require("../../utils/util");

// pages/login/login.jsx
const wxp = getApp().wxp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    modalTitle: "",
    modalContent: "",
  },
  bindGetUserInfo: async function (e) {
    let detail = e.detail;
    delete detail.userInfo;
    console.log(detail);
    let {code} = await wxp.login();
    detail.code = code;
    let data = await wxp.requestWithToken(API.login,detail,"POST")
    if (data && 200 == data.code) {
      wx.setStorageSync('token', data.object.token);
      wx.setStorageSync('userInfo', data.object.user);
      wx.switchTab({
        url: '../me/me',
      })
    } else {
      this.showModal("提示", data.message);
    }
  },
  showModal: function (title, content) {
    this.setData({
      modalTitle: title,
      modalContent: content,
      showModal: true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    })
  },
  navigateToPhoneLogin: function (e) {
    wx.navigateTo({
      url: '../phonelogin/phonelogin',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})