// pages/doexercise/doexercise.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBar: getApp().globalData.StatusBar,
    /**
     * id
     * 题目文字
     * 题目附图
     * 单选答案
     * 多选答案
     * 判断答案
     * 填空答案
     * 简答题答案
     * 选项Json字符串
     * 试题难度级别
     * 答对次数
     * 答错次数
     * 文字解析
     * 视频解析链接
     * 关键词
     */
    nowquest: {},
    ansercard: false, //显示答题卡
    isLoading:true,
    nowIndex: 0,
    mode: 0, //0 代表练习模式 1代表背题模式
    storeAnser: [],
    question: [{
      title: "游戏治疗中治疗者不应该做的是?",
      type: "多选",
      selectans: ["A"],
      judge: undefined,
      vacancy: undefined,
      shortans: undefined,
      choices: {
        A: "从不向儿童提任何要求",
        B: "儿童自己能做的事情,不包办代替",
        C: "让儿童感觉到是一个关心他们、了解他们的人,是可以和他们沟通的人",
        D: "让儿童感觉到与治疗者在一起是放松的自由的,他们可以自由探索、创造或闲逛"
      },
      righttime: 10,
      wrongtime: 4,
      video: "https://asdad/",
      keyword: ["游戏治疗", "儿童"]
    }, {
      title: "游戏治疗中治疗者不应该做的是?",
      type: "多选",
      selectans: ["A", "B"],
      judge: true,
      vacancy: ["正确的"],
      shortans: "",
      choices: {
        A: "从不向儿童提任何要求",
        B: "儿童自己能做的事情,不包办代替",
        C: "让儿童感觉到是一个关心他们、了解他们的人,是可以和他们沟通的人",
        D: "让儿童感觉到与治疗者在一起是放松的自由的,他们可以自由探索、创造或闲逛"
      },
      righttime: 10,
      wrongtime: 4,
      video: "https://asdad/",
      keyword: ["游戏治疗", "儿童"]
    }, {
      title: "## 12123 $$\\frac{1}{(\\sqrt{\\phi \\sqrt{5}}-\\phi) e^{\\frac25 \\pi}} =1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {1+\\frac{e^{-6\\pi}}{1+\\frac{e^{-8\\pi}} {1+\\ldots} } } }$$",
      type: "填空",
      selectans: undefined,
      judge: true,
      vacancy: ["衣带渐宽终不悔"],
      shortans: "",
      choices: undefined,
      righttime: 10,
      wrongtime: 4,
      video: "https://asdad/",
      keyword: ["古诗"]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _ts = this;
    wx.request({
      url: 'http://127.0.0.1:5500/1234.html', //仅为示例，并非真实的接口地址,
      success(res) {
        console.log(res.data)
        let result = app.towxml(res.data, 'markdown', {
          events: { // 为元素绑定的事件方法
            tap: (e) => {
              console.log('tap', e);
            }
          }
        });
        // 更新解析数据
        _ts.setData({
          nowquest: result,
          isLoading:false,
        });
      }
    })
  },
  chooseAnser: function (e) {
    let key = e.currentTarget.dataset.key;
    let nowIndex = this.data.nowIndex;
    let nowQues = this.data.question[nowIndex];
    let storeAnser = this.data.storeAnser;
    if (storeAnser.length == 0) {
      storeAnser.push([key]);
    } else {
      if (nowQues.type == '单选') {
        storeAnser.shift();
        storeAnser.push([key]);
      } else if (nowQues.type == '多选') {
        let _now = storeAnser[nowIndex];
        let index = _now.indexOf(key);
        console.log(_now,index)
        if (index > -1) {
          _now.splice(index, 1);
        } else {
          _now.push(key);
          storeAnser[nowIndex] = _now;
        }
      }
    }
    this.setData({
      storeAnser: storeAnser,
    }, () => {
    })
  },
  cgNowIndex: function (e) {
    let nowIndex = e.currentTarget.dataset.nowindex;
    this.setData({
      nowIndex: nowIndex
    })
  },
  showAnsCard: function () {
    this.setData({
      ansercard: true
    })
  },
  nextQuestion() {
    if (this.data.nowIndex < this.data.question.length - 1) {
      this.setData({
        nowIndex: this.data.nowIndex + 1
      })
    }
  },
  hideAnsCard: function () {
    this.setData({
      ansercard: false
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