const {
  utf8Decode
} = require("../../utils/util");
var Base64 = require('base64-utf8');
// pages/doexercise/doexercise.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitModal: false,
    statusBar: getApp().globalData.StatusBar,
    nowQuest: {},
    nowOptions: {},
    nowFlank: [],
    anwsercard: false, //显示答题卡
    isLoad: true,
    nowIndex: 0,
    mode: 0, //0 代表练习模式 1代表背题模式
    storeAnswer: {},
    questions: [],
    questionDetail: {},
    animation: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    let prevQ = JSON.stringify(prevPage.data.questions);
    prevQ = JSON.parse(prevQ);
    let questionDetail = prevPage.data.item;
    let _q = prevQ.map(e => {
      e.title = Base64.decode(e.title);
      if (e.cqans)
        e.cqans = JSON.parse(Base64.decode(e.cqans));
      if (e.jqans)
        e.jqans = JSON.parse(Base64.decode(e.jqans));
      if (e.fbans)
        e.fbans = JSON.parse(Base64.decode(e.fbans));
      if (e.saand)
        e.saand = Base64.decode(e.saand);
      if (e.options)
        e.options = JSON.parse(Base64.decode(e.options));
      return e;
    })
    console.log(_q);
    this.setData({
      questions: _q,
      questionDetail: questionDetail
    }, () => {
      this.render()
    })

  },
  fbankInput(e) {
    let index = e.currentTarget.dataset.index
    let data = e.detail.value
    let storeAnswer = this.data.storeAnswer;
    const nowQues = this.data.questions[this.data.nowIndex];
    storeAnswer['' + nowQues.id][index] = data
    this.setData({
      storeAnswer: storeAnswer
    })
  },
  render: function () {
    this.setData({
      isLoad: true,
    })
    const nowQues = this.data.questions[this.data.nowIndex];
    // 更新解析数据
    this.setData({
      nowQuest: nowQues,
    });
    if (nowQues.type.indexOf("选") != -1) {
      this.setData({
        nowOptions: nowQues.options,
      });
    }
    if (nowQues.type == "填空") {
      let storeAnswer = this.data.storeAnswer;
      storeAnswer['' + nowQues.id] = [];
      this.setData({
        nowFlank: nowQues.fbans,
        storeAnswer: storeAnswer
      })
    }
    console.log(nowQues, this.data.storeAnswer);
    this.setData({
      isLoad: false,
    })
  },

  textInput(e) {
    let data = e.detail.value;
    let nowIndex = this.data.nowIndex;
    let nowQues = this.data.nowQues;
    this.data.storeAnswer['' + nowQues.id] = data;
    this.setData({
      storeAnswer: this.data.storeAnswer
    })
  },
  chooseAnwser: function (e) {
    let key = e.currentTarget.dataset.key;
    let nowIndex = this.data.nowIndex;
    let nowQues = this.data.nowQues;
    let storeAnswer = this.data.storeAnswer;
    let ans = storeAnswer['' + nowQues.id];
    if (ans) {
      if (ans.length > 0) {
        let index = ans.indexOf(key);
        if (index > -1) {
          ans.splice(index, 1);
        } else {
          if (nowQues.type == '多选') {
            ans.push(key);
          } else {
            ans = [];
            ans.push(key);
          }
        }
      } else {
        ans.push(key);
      }
    } else {
      ans = [];
      ans.push(key);
    }
    storeAnswer['' + nowQues.id] = ans;
    this.setData({
      storeAnswer: storeAnswer
    }, () => {
      if (nowQues.type != '多选') {
        this.nextQuestion()
      }
    })
  },
  submitPaper() {
    wx.navigateTo({
      url: '/pages/exerciseres/exerciseres',
    })
  },
  showSubmitModal() {
    console.log(this.data.storeAnswer);
    this.setData({
      submitModal: true
    })
  },
  hideSubmitModal() {
    this.setData({
      submitModal: false
    })
  },
  cgNowIndex: function (e) {
    let nowIndex = e.currentTarget.dataset.nowindex;
    this.setData({
      nowIndex: nowIndex,
      nowQues: this.data.questions[nowIndex]
    }, () => {
      this.render();
    })
  },
  showAnsCard: function () {
    this.setData({
      anwsercard: true
    })
  },
  nextQuestion() {
    this.setData({
      nowIndex: this.data.nowIndex + 1,
      nowQues: this.data.questions[this.data.nowIndex + 1]
    }, () => {
      this.render();
    })
  },
  next() {
    if (this.data.nowIndex < this.data.questions.length - 1) {
      this.nextQuestion();
    } else {
      this.showSubmitModal();
    }
  },
  hideAnsCard: function () {
    this.setData({
      anwsercard: false
    })
  },
  toggleAnswer: function () {
    if (this.data.mode == 0) {
      this.setData({
        mode: 1
      })
    } else if (this.data.mode == 1) {
      this.setData({
        mode: 0
      })
    }
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