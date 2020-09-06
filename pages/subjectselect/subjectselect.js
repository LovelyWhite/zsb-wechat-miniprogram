const {
  API
} = require("../../utils/util");

// pages/subjectselect/subjectselect.js
const wxp = getApp().wxp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects: [],
    isLoad: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllSubject();
  },
  getAllSubject: async function () {
    this.setData({
      isLoad: true,
    })
    let data = await wxp.requestWithToken(API.getAllSubject);
    if (data && 200 == data.code) {
      this.setData({
        isLoad: false,
        subjects: data.object
      })
    } else {

    }
  },
  selectSubject: async function (e) {
    let id = e.currentTarget.dataset.id;
    let item = e.currentTarget.dataset.item;
    let data = await wxp.requestWithToken(API.updateLearning,{
      learningid:id,
      openid:wx.getStorageSync('userInfo').openid
    });
    if (data && 200 == data.code) {
     let userInfo =  wx.getStorageSync('userInfo');
     userInfo.secondsubject = userInfo.secondsubject?userInfo.secondsubject:{}
     userInfo.secondsubject.code = item.code
     userInfo.secondsubject.name = item.name
     wx.setStorageSync('userInfo',userInfo);
      wx.navigateBack({
        delta: 0,
      })
    } else {

    }
  },
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