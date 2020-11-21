const {
  API
} = require("../../utils/util");

// pages/xuedou/xuedou.js
const wxp = getApp().wxp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollViewHeight: 0,
    showMoneyModal: true,
    nowMoneyIndex: 2,
    moneyOption: [{
      value: 0,
      name: '10元',
      hot: false,
    }, {
      value: 1,
      name: '20元',
      hot: false,
    }, {
      value: 2,
      name: '30元',
      hot: true,
    }, {
      value: 3,
      name: '60元',
      hot: true,
    }, {
      value: 4,
      name: '80元',
      hot: false,
    }, {
      value: 5,
      name: '100元',
      hot: false,
    }],
    isLoad: false,
    restMoney: wx.getStorageSync("userInfo").money
  },
  chooseMoney(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      nowMoneyIndex: index
    })
  },
  hideModal() {
    this.setData({
      showMoneyModal: false
    })
  },
  async pay() {
   let userInfo = wx.getStorageSync('userInfo');
    let data = await wxp.requestWithToken(API.pay, {
      openid: userInfo.openid,
      userid:userInfo.id,
      fee: 1,
    });
    try {
      let payData = await wx.requestPayment(data.object);
      if (payData.errMsg == "requestPayment:ok") {
        wx.showToast({
          title: '充值成功',
        })
      }
    } catch (e) {
      wx.showToast({
        title: '支付取消',
        icon: "none"
      })
    }
  },
  updateInformationInternet: async function () {
    this.setData({
      isLoad: true
    })
    let data = await wxp.requestWithToken(API.findUserByOpenid, {
      openid: wx.getStorageSync("userInfo").openid
    });
    if (data && 200 == data.code) {
      console.log(data.object)
      wx.setStorageSync('userInfo', data.object);
      this.setData({
        restMoney: data.object.money
      })
    }
    this.setData({
      isLoad: false
    })
  },
  showModal() {
    this.setData({
      showMoneyModal: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateInformationInternet()
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