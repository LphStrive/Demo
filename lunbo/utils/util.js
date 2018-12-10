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
//判断是否为空对象
function isEmpty(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}
//判断数字
function isRealNum(val) {
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
  if (val === "" || val == null) {
    return false;
  }
  if (!isNaN(val)) {
    return true;
  } else {
    return false;
  }
}
const testPhone = num => {
  var reg = /^1[3|4|5|7|8][0-9]{9}$/;
  if (reg.test(num)) {
    return true;
  }
  return false;
}
function cons(){
  console.log("测试")
}

module.exports = {
  formatNumber,
  formatTime,
  isEmpty,
  cons,
  testPhone
}
