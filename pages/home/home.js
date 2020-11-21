// pages/home/home.js
import {
  API,
  RequestUrl
} from "../../utils/util"
var Base64 = require('base64-utf8');
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
    goodCourse:[],
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
    let dataType = await wxp.requestWithToken(API.getAllType)
    if (dataType && 200 == dataType.code) {
      this.setData({
        part1: dataType.object.map(v => {
          v.icon = RequestUrl + "/images" + v.icon
          return v
        }),
      })
    }
    let dataCourse = await wxp.requestWithToken(API.getCourse,{
      secondsubjectid:this.data.loginData.secondsubject.id
    });
    if (dataType && 200 == dataType.code) {
      console.log(dataCourse.object);
      let data = dataCourse.object;
      data = data.map(e=>{
       e.intro =  Base64.decode(e.intro);
       e.teacher.intro = Base64.decode(e.teacher.intro);
       return e;
      })
      this.setData({
        goodCourse:data,
        isLoad:false,
      })
    }
  },
  goCourseDetail(e){
    console.log(e);
    let index= e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/videoshow/videoshow?index='+index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!this.data.loginData){
      wx.switchTab({
        url: '/pages/me/me',
      })
    }
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