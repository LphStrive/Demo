import COS from '../lib/cos-wx-sdk-v5';
import config from "./config.js";
import util from "./util.js";
const dataUrl = config.basePath;
const app = getApp();
let errorNum = 0;

const scope = {
  "scope.userInfo": '用户信息',
  "scope.userLocation": '地理位置',
  "scope.address": '通讯地址',
  "scope.invoiceTitle": '发票抬头',
  "scope.werun": '微信运动步数',
  "scope.record": '录音功能',
  "scope.writePhotosAlbum": '保存到相册',
  "scope.camera": '摄像头',
}


function request(url,data = {}, method = "GET", contentType = "application/json",needSession3=true) {
  const app = getApp();
  const that = this;``
  return new Promise(function (resolve, reject) {
    let header = {};
    if (needSession3){
      header={
        'Content-Type': contentType,
        'session3': app.globalData.session3 || wx.getStorageSync('session3')
      }
    }else{
      header = {
        'Content-Type': contentType,
      }
    }
    wx.request({
      url: dataUrl + url,
      data: data,
      method: method,
      header,
      success: function ({ statusCode, data, errMsg }) {
        if (statusCode == 200) {
          if (data.errcode === 9401) {
            login().then(() => {
              errorNum++;
              if (errorNum<5){
                request(url, data = {}, method, contentType, needSession3).then(data => {
                  resolve(data)
                }).catch(res => {
                  reject({ statusCode, data, errMsg })
                })
              }else{
                reject({ statusCode, data, errMsg })
              }
            })
          } else {
            errorNum = 0;
            resolve(data);
          }
        } else {
          reject({ statusCode, data, errMsg })
        }
      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}

// login
function login() {
  const that = this;
  return new Promise(function (resolve, reject) {
    wx.login({
      success: ({ code }) => {
          console.log('landing',code);
        // wx.request({
        //   url: dataUrl + '/wx/user/login',
        //   data: { code: code },
        //   method: 'GET',
        //   success: res => {
        //       console.log('ask',res);
        //     wx.setStorageSync("session3", res.data.session3);
        //     // wx.setStorageSync("flag", 0);
        //     if(res.data.user){
        //       wx.setStorageSync("adminUserM", res.data.user);
        //       resolve(res.data.session3, res.data.user);
        //     }else{
        //       resolve(res.data.session3);
        //     }
        //   },
        //   fail: res => {
        //     reject(res);
        //   }
        // })
      }
    })
  })
}
function getUserInfoFn() {
  const that = this;
  return new Promise(function (resolve, reject) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            lang: 'zh_CN',
            withCredentials: true,
            success: function (res) {
              let userInfo = res.userInfo;
              wx.setStorageSync('user', userInfo);
              request('/wx/user/wxinfo/update', {
                ...userInfo     
              }, 'POST').then(res => {
                wx.setStorageSync('userA', res);                
                console.log('update',res)
                resolve(userInfo);
              }).catch(res => { 
                reject(res);
                console.log('更新用户信息失败', res) 
              })
            },
            fail: function (err) {
              console.log('用户点了取消')
              reject(err);
            }
          })
        }
      }
    })
  });
}
function openSetting(type) {
  const that = this;
  return new Promise(function (resolve, reject) {
    wx.getSetting({
      success: (res) => {
        if (util.isEmpty(res.authSetting)) {
          console.log('授权为空')
          resolve();
        } else if (!res.authSetting[type]) {
          let title = scope[type];
          console.log('授权为false' + title)
          wx.showModal({
            title: "为了正常使用小程序",
            content: '需要授权' + title,
            success: (res) => {
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting[type]) {
                      resolve();
                    } else {
                      reject();
                    }
                  }
                })
              } else {
                reject('click cancal')
              }
            },
            fail: (res) => {
              reject(res)
            }
          })
        }else{
          resolve();
        }
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}
function pay(orderNo) {
  return new Promise(function (resolve, reject) {
    request('/wx/pay/prepay', { orderNo }).then(res => {
      wx.requestPayment({
        'timeStamp': res.timestamp,
        'nonceStr': res.nonceStr,
        'package': res.packageString,
        'signType': 'MD5',
        'paySign': res.paySign,
        'success': function (res) {
          if (res.errMsg == "requestPayment:ok") {
            request('/wx/pay/check', { orderNo }).then(res => {
              console.log(res, 'check');
              if (res.errmsg == 'OK') {
                resolve(true);
              } else {
                reject(false)
              }
            }).catch(res => {
              reject(false)
            })
          }
        },
        'fail': function (res) {
          reject(false)
        }
      })
    }).catch(res => {
      reject(false)
    })
  })
}
// /wx/wxpay/prepayHistory
function prepayHistory(historyNo) {
  return new Promise(function (resolve, reject) {
    request('/wx/wxpay/prepayHistory', { historyNo }).then(res => {
      wx.requestPayment({
        'timeStamp': res.timestamp,
        'nonceStr': res.nonceStr,
        'package': res.packageString,
        'signType': 'MD5',
        'paySign': res.paySign,
        'success': function (res) {
          if (res.errMsg == "requestPayment:ok") {
            request('/wx/wxpay/checkHistory', { historyNo }).then(res => {
              console.log(res, 'check');
              if (res.errmsg == 'OK') {
                resolve(true);
              } else {
                reject(false)
              }
            }).catch(res => {
              reject(false)
            })
          }
        },
        'fail': function (res) {
          reject(false)
        }
      })
    }).catch(res => {
      reject(false)
    })
  })
}
//检查微信的checkSession3
function checkSession3(){
  return new Promise(function(resolve,reject){
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        login().then(res=>{
          resolve(true);
        }).catch(res=>{
          reject(false)
        })
      }
    })
  })
}
module.exports = {
  login,
  request,
  getUserInfoFn,
  openSetting,
  pay,
  prepayHistory,
  checkSession3
}

