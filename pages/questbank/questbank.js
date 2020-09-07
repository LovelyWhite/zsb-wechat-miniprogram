// pages/questbank/questbank.js
import {API, formatTime} from "../../utils/util"
const wxp = getApp().wxp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    isLoad:false,
    questbank: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      typeId:options.typeId
    },()=>{
      this.updateQuestionBank();
    })
  },
  navigateToDetail:function(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/quesbankdetail/quesbankdetail?index='+index
    })
  },
  updateQuestionBank:async function(){
    this.setData({
      isLoad:true
    })
    let data = await wxp.requestWithToken(API.findQuestionBank,{
      typeid:this.data.typeId,
      secondsubjectid:wx.getStorageSync('userInfo').secondsubject.id
    });
    if (data && 200 == data.code) {
      this.setData({
        questbank:data.object.map(v=>{
          v.updatetime = formatTime(new Date(v.updatetime))
          return v;
        })
      })
    }
    this.setData({
      isLoad:false
    })
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