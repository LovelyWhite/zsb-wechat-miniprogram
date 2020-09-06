const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// const RequestUrl = "http://39.106.117.227"

const RequestUrl = "http://192.168.123.216:8080"
const API = {
  getAllType: RequestUrl + "/questionbank/getalltype",
  login:RequestUrl+"/wechat/login",
  findUserByOpenid:RequestUrl+"/user/finduserbyopenid",
  changeSexByopenid:RequestUrl+"/user/changesexbyopenid",
  findQuestionBank:RequestUrl+"/questionbank/findquestionbankbyany",
  getAllSubject:RequestUrl+"/subject/getallsubject",
  updateLearning:RequestUrl+"/user/updatelearning"
}
const RenderUrl = RequestUrl + ":8001"
module.exports = {
  API: API,
  formatTime: formatTime,
  RequestUrl: RequestUrl,
  RenderUrl: RenderUrl
}