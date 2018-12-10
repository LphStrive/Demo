  //app.js
import {
  login,
  request as R,
  checkSession3,
  openSetting,
  getUserInfoFn
} from "./utils/request.js";
import {
  uploadAudio,
} from './utils/upload.js';
import {
  checkUser
} from './utils/user.js';
import config from "./utils/config.js";
import util from "./utils/util.js";
const recorderManager = wx.getRecorderManager();
App({
  data: {
    imgBaseUrl: config.imgBaseUrl,
    basePath: config.basePath,
  },
  globalData: {
    isLogin: false,
    userInfo: null,
    session3: null,
    checkCard: false,
    typeId:false,
    inputId:false,
    act:false,

  },

  onLaunch: function() {
    const that = this;
    // 获取手机系统信息
    wx.getSystemInfo({
      success: res => {
        //导航高度
        that.globalData.navHeight = res.statusBarHeight + 46;
      }, fail(err) {
        console.log(err);
      }
    })
    const session3 = wx.getStorageSync('session3');
    if (session3) {
      console.log('有session3')
      that.globalData.isLogin = true;
      wx.hideLoading();
      checkUser("app.js");
      getUserInfoFn().then(res => {
        that.globalData.userInfo = res;
      }).catch(res => {
        
      });
    } else {
      console.log('没有session3')
      login().then((res,user) => {
        console.log(user,'user')
        const adminUserM = wx.getStorageSync('adminUserM');
        if ((adminUserM && !adminUserM.modify) || !adminUserM) {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }else{
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
        // 存储session3
        that.globalData.isLogin = true;
        wx.hideLoading();
        // 获取并更新用户信息
        getUserInfoFn().then(function(res) {
          that.globalData.userInfo = res;
        }).catch(function(res) {
          
        });
      }).catch(res => {
        that.globalData.isLogin = false;
        wx.showToast({
          title: '加载失败！',
        })
        console.log(res)
      })
    }
    that.initPlayAudio();
  },
  onShow:function(){
    const that = this;
   
  },
// 开始录音
  start: function () {
    // const recorderManager = wx.getRecorderManager()
    const options = {
      duration:600000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
    recorderManager.start(options)
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  // 结束录音
  end: function (callback) {
    recorderManager.stop()
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
      uploadAudio(tempFilePath).then(res => {
        if (res) {
          wx.showToast({
            title: '语音添加成功',
            incon: 'none'
          })
            callback(res);
        }else{
          wx.showToast({
            title: '语音添加失败',
            incon: 'none'
          })
        }

      }).catch(err => {
        console.log('err', err);
      })
      
    })
    
  },


  /*
    that.globalData.audioContext   实例
    that.globalData.isPlay         播放状态
  */
  initPlayAudio: function() {
    const that = this;
    that.globalData.audioContext = wx.createInnerAudioContext();
    that.globalData.audioContext.onStop(function(res) {
      that.globalData.isPlay = false;
    })
    that.globalData.audioContext.onError(function(res) {
      that.globalData.isPlay = false;
    })
  },


  // 异步下载
  downLoad: function(url) {
    const that = this;
    return new Promise(function(resolve, reject) {
      wx.downloadFile({
        url: url,
        header: {
          session3: wx.getStorageSync('session3')
        },
        success: function(res) {
          if (res.statusCode === 200) {
            resolve(res.tempFilePath);
          }
        },
        fail: function(res) {
          console.log('downLoadFail')
          reject(res)
        }
      })
    })
  },
  getConfig: function() {
    const that = this;
    R('/wx/getConfig').then(res => {
      wx.setStorageSync('adminConfig', res);
    }).catch(res => {})
  },
  checkVersion: function() {
    const that = this;
    R('/wx/checkVersion').then(res => {
      if (res.sign !== wx.getStorageSync('configVersion')) {
        that.getConfig();
        that.checkCard();
        wx.setStorageSync('configVersion', res.sign);
      }
    }).catch(res => {})
  },
  // 检查个人名片
  checkCard: function() {
    const that = this;
    return new Promise(function(resolve, reject) {
      R('/wx/businessCard/getUserBusinessCard', {
        userId: wx.getStorageSync('adminUser').id
      }).then(res => {
        let goPass = true;
        if (!res.avatarUrl) {
          goPass = false;
        }
        if (!res.realname) {
          goPass = false;
        }
        if (!res.mobile) {
          goPass = false;
        }
        if (!res.erCode) {
          goPass = false;
        }
        if (goPass) {
          that.globalData.checkCard = true;
        }
        wx.setStorageSync('checkCard', res)
        resolve({
          goPass,
          res
        });
      }).catch(res => {
        reject(res);
        console.log(res, 'error')
      })
    })
  },
  // 绑定手机号
  bindPhone: function(e, that) {
    const self = this;
    return new Promise(function(resolve, reject) {
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        checkSession3().then(res => {
          self.bindPhoneR(e, that).then(res => {
            resolve(res);
          }).catch(res => {
            reject();
          });
        }).catch(res => {
          login().then(res => {
            // 存储session3
            that.globalData.isLogin = true;
            self.bindPhoneR(e, that).then(res => {
              resolve(res);
            }).catch(res => {
              reject();
            });
          }).catch(res => {
            that.globalData.isLogin = false;
            wx.showToast({
              title: '加载失败！',
            })
            console.log(res)
          })
          console.log(res);
        })
      }
    })
  },
  bindPhoneR: function(e, that) {
    return new Promise(function(resolve, reject) {
      let phone = {
        "iv": e.detail.iv,
        "enData": e.detail.encryptedData
      };
      R('/wx/user/mobile/update', {
        "iv": e.detail.iv,
        "enData": e.detail.encryptedData
      }, 'POST').then(res => {
        if (res) {
          wx.showModal({
            title: '绑定手机成功',
            showCancel: false,
          })
          R('/wx/user//info/update',{ mobile: res},'POST').then(res => {
          // R('/wx/user/mobile/update').then(res => {
            wx.setStorageSync('adminUser', res);
          }).catch(res => {
            console.log(res)
          })
          resolve(res);
          wx.setStorageSync('phone', res)
          that.setData({
            bindPhone: res
          });
        } else {
          reject();
          wx.showModal({
            title: '绑定手机失败',
            showCancel: false,
          })
        }
      }).catch(res => {
        reject();
        console.log('fail', res)
        wx.showModal({
          title: '绑定手机失败',
          showCancel: false,
        })
      })
    })
  }
})