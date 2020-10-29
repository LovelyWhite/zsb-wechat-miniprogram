const {
  API
} = require("../../utils/util");

// pages/exerciseres/exerciseres.js
const wxp = getApp().wxp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [],
    storeAnswer: {},
    judge: [],
    score: 0,
    questionDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    let prevQ = JSON.stringify(prevPage.data.questions);
    let questionDetail = prevPage.data.questionDetail;
    prevQ = JSON.parse(prevQ);
    let prevStoreAns = JSON.stringify(prevPage.data.storeAnswer);
    prevStoreAns = JSON.parse(prevStoreAns);
    this.setData({
      questions: prevQ,
      storeAnswer: prevStoreAns,
      questionDetail: questionDetail
    }, () => {
      this.judge();
    })

    console.log(this.data.questions, this.data.storeAnswer);
  },
  //判断题目对错
  async judge() {
    let ques = this.data.questions;
    let storeAns = this.data.storeAnswer;
    let judge = [];
    for (let i = 0; i < ques.length; i++) {
      if (ques[i].type.indexOf('选') != -1) {
        let wans = storeAns['' + ques[i].id]; //答题答案
        let ans = ques[i].cqans; //标准答案
        if (wans) {
          if (ans.length != wans.length) {
            judge[i] = false;
          } else {
            let flag = true;
            for (let x = 0; x < ans.length; x++) {
              if (wans.indexOf(ans[x]) == -1) {
                flag = false
                break;
              }
            }
            judge[i] = flag;
          }
        } else {
          judge[i] = false;
        }
      } else if (ques[i].type == '填空') {
        let wans = storeAns['' + ques[i].id]; //答题答案
        let ans = ques[i].fbans; //标准答案
        if (ans.length != wans.length) {
          judge[i] = false;
        } else {
          let flag = true;
          for (let x = 0; x < ans.length; x++) {
            if (wans[x] != ans[x]) {
              flag = false;
              break;
            }
          }
          judge[i] = flag;
        }
      }
    }
    let fal = 0,
      suc = 0;
    judge.forEach(e => {
      if (e == false) {
        fal++;
      } else if (e == true) {
        suc++;
      }
    })

    this.setData({
      judge: judge,
      score: Math.floor(suc * 100 / (suc + fal))
    })
    console.log(this.data.questionDetail);
    let user = wx.getStorageSync('userInfo');
    let data = await wxp.requestWithToken(API.insertAnsRecord, {
      userid: user.id,
      questionbankid: this.data.questionDetail.id,
      costtime: 9000,
      ansertime: Date.now(),
      gotscore: this.data.score,
      score: -1,
    }, "POST");
    console.log(data);
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