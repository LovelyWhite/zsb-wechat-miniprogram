// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBar: getApp().globalData.StatusBar,
    goods: [{
        name: "C语言从入门到精通",
        price: 90,
        poster: "https://img10.360buyimg.com/n1/s200x200_jfs/t1/113129/19/14804/171497/5f34e2a4Eba4ddf4d/ccc980346d3a21d9.jpg",
        perferprice: 70,
      },
      {
        name: "Java开发",
        price: 40,
        poster: "https://img14.360buyimg.com/n7/jfs/t1/93086/16/13238/159608/5e53ab64E28f7fc8b/5d9509f781e7b2c2.jpg",
        perferprice: 40,
      },
      {
        name: "Golang",
        price: 100,
        poster: "https://img10.360buyimg.com/n7/g6/M03/00/00/rBEGDFAqINsIAAAAAAI2CzSXvvAAAAAMQMaF24AAjYj182.jpg",
        perferprice: 70,
      }
    ]
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