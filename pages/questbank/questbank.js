// pages/questbank/questbank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    questbank: [{
      id: 1,
      name: "120033 大学语文",
      date: "2020-02-12",
      done: 14,
      satisfaction: 4,
      intro: "2020年最新的大学语文试题"
    }, {
      id: 2,
      name: "120034 大学语文",
      date: "2020-02-14",
      done: 455,
      satisfaction: 4,
      intro: "2020年最新的大学语文试题"
    }]
  },
  navigateToExercise: function (e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/doexercise/doexercise',
      success: (res) => {
        res.eventChannel.emit('transfer', item);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
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