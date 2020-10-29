const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// const RequestUrl = "http://39.106.117.227"

const RequestUrl = "http://192.168.123.216:8080"
const API = {
  getAllType: RequestUrl + "/questionbank/getalltype",
  login: RequestUrl + "/wechat/login",
  findUserByOpenid: RequestUrl + "/user/findbyopenid",
  changeSexByopenid: RequestUrl + "/user/changesexbyopenid",
  findQuestionBank: RequestUrl + "/questionbank/findbyany",
  getQuestionBankDetail: RequestUrl + "/questionbank/getdetailbyid",
  getAllSubject: RequestUrl + "/subject/getall",
  updateLearning: RequestUrl + "/user/updatelearning",
  insertAnsRecord:RequestUrl + "/answerrecord/insert"
}
module.exports = {
  API: API,
  formatTime: formatTime,
  RequestUrl: RequestUrl,
}