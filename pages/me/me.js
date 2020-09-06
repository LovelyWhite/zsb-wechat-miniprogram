const { API } = require("../../utils/util");

// pages/me/me.js
const wxp = getApp().wxp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginData: wx.getStorageSync('userInfo'),
    part1: [{
        bg: "/assests/icons/bookshelf.png",
        text: "我的课程",
        nav: "/pages/mycourse/mycourse"
      },
      {
        bg: "/assests/icons/write.png",
        text: "我的订单",
        nav: "/pages/myorder/myorder"
      },
      {
        bg: "/assests/icons/teacher.png",
        text: "专属老师",
        nav: "/pages/mycourse/mycourse"
      }
    ],
    part2: [{
      icon: 'favor',
      color: 'red',
      badge: 0,
      name: '收藏'
    }, {
      icon: 'comment',
      color: 'orange',
      badge: 1,
      name: '评价'
    }, {
      icon: 'notification',
      color: 'yellow',
      badge: 0,
      name: '通知'
    }, {
      icon: 'vip',
      color: 'olive',
      badge: 22,
      name: '会员'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }],
    part3: [{
      icon: 'pay',
      color: 'red',
      badge: 0,
      name: '学豆'
    }, {
      icon: 'peoplefill',
      color: 'orange',
      badge: 1,
      name: '客服'
    }, {
      icon: 'settings',
      color: 'yellow',
      badge: 0,
      name: '设置'
    }, {
      icon: 'mail',
      color: 'olive',
      badge: 22,
      name: '建议'
    }]
  },

  navigatePart1: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.nav
    })
  },
  navigateMeInformation: function (e) {
    if (this.data.loginData) {
      wx.navigateTo({
        url: '/pages/meinformation/meinformation'
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  updateInformation:function(){
    this.setData({
      loginData:wx.getStorageSync('userInfo')
    })
  },
  updateInformationInternet: async function(){
   let data = await wxp.requestWithToken(API.findUserByOpenid,{
    openid:wx.getStorageSync("token")
   });
   console.log(data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.updateInformationInternet();
  },
  login: function () {
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
    this.updateInformation()
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