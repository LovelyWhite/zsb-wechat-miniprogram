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

const RequestUrl = "http://localhost:8080"
const API = {
  getType: RequestUrl + "/questionbank/gettype"
}
const RenderUrl = RequestUrl + ":8001"
module.exports = {
  API: API,
  formatTime: formatTime,
  RequestUrl: RequestUrl,
  RenderUrl: RenderUrl
}