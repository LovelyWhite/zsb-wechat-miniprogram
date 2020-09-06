// pages/home/home.js
import {
  API,
  RequestUrl
} from "../../utils/util"
const wxp = getApp().wxp;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad: true,
    showModal:false,
    modalTitle:"",
    modalContent:"",
    loginData: wx.getStorageSync("userInfo"),
    statusBar: getApp().globalData.StatusBar,
    part1: [],
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
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
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  navigateSubjetSelect: function () {
    if (this.data.loginData) {
      wx.navigateTo({
        url: "/pages/subjectselect/subjectselect"
      })
    }
    else{
      this.showModal("提示","您尚未登陆");
    }
  },

  navigateToTarget: function (e) {
    if(this.data.loginData){
      if(this.data.loginData.secondsubject){
        let item = e.currentTarget.dataset.item;
        console.log(item);
        wx.navigateTo({
          url: "/pages/questbank/questbank?title=" + item.type+"&typeId="+item.id
        })
      }
      else{
        this.showModal("提示","请先选择要学习的科目");
      }
    }
    else{
      this.showModal("提示","您尚未登陆");
    }
  },
  refreshUI: async function () {
    this.setData({
      isLoad: true,
    })
    let data = await wxp.requestWithToken(API.getAllType)
    if (data && 200 == data.code) {
      this.setData({
        part1: data.object.map(v => {
          v.icon = RequestUrl + "/images" + v.icon
          return v
        }),
        isLoad: false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refreshUI();
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
    this.setData({
      loginData: wx.getStorageSync('userInfo')
    })
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