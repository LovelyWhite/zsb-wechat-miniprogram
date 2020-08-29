// pages/phonelogin/phonelogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canLogin: false,
    canVerify: false,
    timing: false,
    timeOut: 60,
    phone: "",
    password: ""
  },
  getVerifyCode: function () {
    const _ts = this;
    this.setData({
      timing: true,
      canVerify: false,
      timeOut: 60,
    }, () => {
      _ts.Interval = setInterval(() => {
        _ts.setData({
          timeOut: _ts.data.timeOut - 1
        }, () => {
          if (_ts.data.timeOut == 0) {
            clearInterval(_ts.Interval)
            _ts.setData({
              timing: false,
              canVerify: true,
            })
          }
        })
      }, 1000)
    })
  },
  bindInputChg(e) {
    let type = e.currentTarget.dataset.type;
    if (type == '0') {
      this.setData({
        phone: e.detail.value
      })
    } else {
      this.setData({
        password: e.detail.value
      })
    }
    if (this.data.phone.length >= 7) {
      this.setData({
        canVerify: true
      })
    } else {
      this.setData({
        canVerify: false
      })
    }
    if (this.data.phone.length >= 7 && this.data.password.length == 6) {
      this.setData({
        canLogin: true
      })
    } else {
      this.setData({
        canLogin: false
      })
    }
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