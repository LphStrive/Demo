import { basePath } from "./config.js";
var COS = require('../lib/cos-wx-sdk-v5');
import {
  request as R
} from './request.js';
const app = getApp();
// 上传文件
function uploadUtil() {
  var that = this;
  return new Promise(function (resolve, reject) {
    var Bucket = 'zhuoer-1257030578';
    var Region = 'ap-beijing';
    let baPath = '';
    // 初始化实例
    var cos = new COS({
      getAuthorization: function (options, callback) {
        // 异步获取签名
        wx.request({
          url: basePath + '/file/rest/cos/post',
          data: { method: 'post', pathname: "/" },
          method: 'GET',
          header: {
            'content-type': 'application/json',
            "session3": wx.getStorageSync('session3'),
          },
          success: function (result) {
            callback(result.data.sign);
            baPath = result.data.https;
          },
          fail: function (r) {
          }
        });
      }
    });
    // 选择文件
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中...',
        })
        var filepath = res.tempFilePaths[0];
        var filename = filepath.substr(filepath.lastIndexOf('/') + 1);
        filename = '/wx/' + filename;
        cos.postObject({
          Bucket: Bucket,
          Region: Region,
          Key: filename,
          FilePath: filepath,
          onProgress: function (info) {
          }
        }, function (err, data) {
          wx.hideLoading();
          if (data) {
            if (baPath) {
              resolve(baPath + filename);
            } else {
              reject(err);
            }
          } else {
            reject(err);
          }
        });
      },
      fail: function (err) {
        wx.hideLoading();
        reject(err);
      },
    })
  })
}

function token(paths) {
  var that = this;
  return new Promise(function (resolve, reject) {
    let tokenTime = wx.getStorageSync('aliTokenTime');
    if (tokenTime && (tokenTime + 60 * 60 * 11 > new Date().getTime())) {
      let token = wx.getStorageSync('aliToken');
      resolve(token);
    } else {
      wx.request({
        url: basePath + "/wx/file/token",
        header: { session3:  wx.getStorageSync('session3') },
        success: function (res) {
          var data = res.data;
          wx.setStorageSync('aliToken', data);
          wx.setStorageSync('aliTokenTime', new Date().getTime());
          //多张图片可以在这里循环
          resolve(data);
        },
        fail: function (err) {
          reject(err)
        }
      })
    }
  })
}

function upload(filepath) {
  var filename = filepath.substr(filepath.lastIndexOf('/') + 1);
  var url = "https://mina-oss.futurelab.tv";
  return new Promise(function (resolve, reject) {
    token().then(data => {
      wx.uploadFile({
        url: url,
        formData: {
          OSSAccessKeyId: data.OSSAccessKeyId,
          signature: data.signature,
          key: data.startWith + filename,
          policy: data.policy,
          success_action_status: 200,
        },
        filePath: filepath,
        name: "file",
        success: function (res) {
          // console.log(res, "upload success")
          // console.log("file", url + "/" + data.startWith + filename);
          // "/"+ data.startWith + filename保存到数据库
          let backUrl = data.startWith + filename;
          resolve(backUrl);
        },
        fail: function (err) {
          reject(err)
        }
      })
    }).catch(res => {
      reject(res)
      wx.showToast({
        title: 'aliyun token fail',
        icon: 'none'
      })
    })
  })
}

function uploadAudio(paths = '') {
  if (!paths) {
    return;
  }
  return new Promise(function (resolve, reject) {
    upload(paths).then(backUrl => {
      resolve(backUrl)
    }).catch(err => {
      reject(err);
    });
  })
}

function uploadVideo() {
  return new Promise(function (resolve, reject) {
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        console.log(res)
        if (res.errMsg == "chooseVideo:ok") {
          var paths = res.tempFilePath;
          upload(paths).then(backUrl => {
            resolve(backUrl)
          }).catch(err => {
            reject(err);
          });
        } else {
          reject();
        }
      },
      fail: function (err) {
        console.log(err);
        reject(err);
      }
    })
  })
}


function uploadImg() {
  return new Promise(function (resolve, reject) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var paths = res.tempFilePaths;
        upload(paths[0]).then(backUrl => {
          resolve(backUrl)
        }).catch(err => {
          reject(err);
        });
      },
    })
  })
}

module.exports = {
  uploadUtil: uploadUtil,
  uploadImg,
  uploadVideo,
  uploadAudio
}  
