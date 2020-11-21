// pages/videoshow/videoshow.js
import {
  API,
  formatTime
} from "../../utils/util"
const wxp = getApp().wxp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: {},
    courseDetail: [],
    courseComment: [],
    nowIndex: 0,
    comment: "",
    scrollViewHeight: 0,
    tabIndex: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    let course = prevPage.data.goodCourse[options.index];
    let data = wx.getSystemInfoSync();
    let windowHeight = data.windowHeight;
    let query = wx.createSelectorQuery().in(this);
    query.select("#navbar").boundingClientRect();
    query.select("#tabbar").boundingClientRect();
    query.exec(res => {
      console.log(res);
      let navbarHeight = res[0].height;
      let tabbarHeight = res[1].height;
      let scrollViewHeight = windowHeight - navbarHeight - tabbarHeight - 200;
      this.setData({
        scrollViewHeight: scrollViewHeight
      })
    })
    this.setData({
      course: course
    }, () => {
      this.renderDetail();
    })

  },
  inputComment(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  async sendComment() {
    if (this.data.comment == "") {
      wx.showToast({
        title: '未输入任何内容',
        icon: "none"
      })
    } else {
      let userinfo = wx.getStorageSync('userInfo');
      let result = await wxp.requestWithToken(API.addCourseComment, {
        courseid: this.data.course.id,
        userid: userinfo.id,
        comment: this.data.comment
      });
      console.log(result)
      if (result && 200 == result.code) {
        this.setData({
          comment: ""
        })
        wx.showToast({
          title: '成功发表评论',
        })
      } else {
        wx.showToast({
          title: '评论发表失败',
          icon: "none"
        })
      }
      this.renderComment();
    }
  },
  tabSelect(e) {
    let index = e.currentTarget.dataset.tabbar;
    this.setData({
      tabIndex: index
    })
  },
  changeVideo(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      nowIndex: index
    })
  },
  renderDetail() {
    this.renderCourseDetail();
    this.renderComment();
  },
  async renderCourseDetail(){
    let courseDetail = await wxp.requestWithToken(API.getCourseDetail, {
      courseid: this.data.course.id
    });

    if (courseDetail && 200 == courseDetail.code) {
      let data = courseDetail.object;
      data = data.sort((object1, object2) => {
        var value1 = object1['postion']
        var value2 = object2['postion']
        if (value2 < value1) {
          return 1
        } else if (value2 > value1) {
          return -1
        } else {
          return 0
        }
      });
      this.setData({
        courseDetail: data,
      })
    }
  },
  async renderComment() {
    let courseComment = await wxp.requestWithToken(API.getCourseComment, {
      courseid: this.data.course.id
    });
    if (courseComment && 200 == courseComment.code) {
      let data = courseComment.object;
      data = data.map(e => {
        e.time = formatTime(new Date(e.time));
        return e;
      })
      this.setData({
        courseComment: courseComment.object
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