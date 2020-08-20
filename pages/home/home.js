// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBar: getApp().globalData.StatusBar,
    part1:[{
      bg:"/assests/icons/qianbi.png",
      text:"每日一练"
    },{
      bg:"/assests/icons/jilu.png",
      text:"考点练习"
    },{
      bg:"/assests/icons/diqiuyi.png",
      text:"历年真题"
    },{
      bg:"/assests/icons/shiyan.png",
      text:"模拟试题"
    },{
      bg:"/assests/icons/chuangyi.png",
      text:"高频题库"
    },{
      bg:"/assests/icons/xueshimao.png",
      text:"通关密卷"
    },{
      bg:"/assests/icons/jiaodai.png",
      text:"考点划题"
    },{
      bg:"/assests/icons/fangdajing.png",
      text:"临考要点"
    }]
  },

  navigateSubjetSelect: function () {
    wx.navigateTo({
      url: "/pages/subjectselect/subjectselect"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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