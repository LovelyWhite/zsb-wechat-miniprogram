const {
  API
} = require("../../utils/util");

// pages/quesbankdetail/quesbankdetail.js
const wxp = getApp().wxp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad: false,
    item: {
      "anticipatetime": "2020-07-49",
      "city": "九江",
      "fsubjectid": 3,
      "id": 1,
      "intro": "测试题库,这个题库是测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库测试题库",
      "name": "高等数学 2019-12",
      "passscore": 60,
      "prefectscore": 100,
      "priceid": 1,
      "questionbanktypeid": 1,
      "ssubjectid": 6,
      "updatetime": 1599396765000
    },
    questions: [],
    done: 0, //做过的人数
  },
  navigateToExercise: function () {
    wx.navigateTo({
      url: '/pages/doexercise/doexercise'
    })
  },
  updateQuestionBank:async function () {
    this.setData({
      isLoad:true,
    })
    let data = await wxp.requestWithToken(API.getQuestionBankDetail, {
      id: this.data.item.id
    });
    if (data && 200 == data.code) {
      console.log(data);
      let obj = data.object;
      this.setData({
        isLoad:false,
        done:obj.done,
        questions:obj.list
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const pages = getCurrentPages();
    // const prevPage = pages[pages.length - 2];
    // let index = options.index;
    // this.setData({
    //   item: prevPage.data.questbank[index]
    // }, () => {
    //   console.log(this.data.item);
    // })
    this.updateQuestionBank();
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
    console.log(this.data.questions)
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