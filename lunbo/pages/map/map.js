// pages/map/map.js
var amapFile = require("../../utils/amap-wx.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'f96cc98243c7637828a1ba2352dc25ec' });
    myAmapFun.getPoiAround({
      success: function (data) {
        console.log(data)
        //成功回调
        that.setData({
          markers: data.markers
        })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
    // wx.getLocation({
    //   type: "gcj02",
    //   success: function(res) {
    //     console.log(res)
    //     var markers = [{
    //         iconPath: '',
    //         id: 3,
    //         latitude: res.latitude - 0.002,
    //         longitude: res.longitude - 0.002,
    //         width: 50,
    //         height: 50,
    //         callout: {
    //           content: "这是我现在的位置"
    //         }
    //       },
    //       {
    //         iconPath: '',
    //         id: 2,
    //         latitude: res.latitude - 0.002,
    //         longitude: res.longitude + 0.002,
    //         width: 50,
    //         height: 50,
    //         callout: {
    //           content: "这是我现在的位置"
    //         }
    //       },
    //       {
    //         iconPath: '',
    //         id: 1,
    //         latitude: res.latitude + 0.002,
    //         longitude: res.longitude - 0.003,
    //         width: 50,
    //         height: 50,
    //         callout: {
    //           content: "这是我现在的位置"
    //         }
    //       },
    //       {
    //         iconPath: '',
    //         id: 4,
    //         latitude: res.latitude + 0.002,
    //         longitude: res.longitude + 0.002,
    //         width: 50,
    //         height: 50,
    //         callout: {
    //           content: "这是我现在的位置"
    //         }
    //       },
    //       {
    //         iconPath: '',
    //         id: 0,
    //         latitude: res.latitude,
    //         longitude: res.longitude,
    //         width: 50,
    //         height: 50,
    //         callout: {
    //           content: "这是我现在的位置",
    //           padding: 5,
    //           borderRadius: 10
    //         }
    //       }
    //     ];
    //     var polyline = [{
    //       points: [{
    //         longitude: res.latitude,
    //         latitude: res.longitude
    //       }, {
    //         longitude: 113.324520,
    //         latitude: 23.21229
    //       }],
    //       color: '#FF0000DD',
    //       width: 2,
    //       dottedLine: true
    //     }];
    //     var controls = [{
    //       id: 1,
    //       iconPath: '/images/icons/round.png',
    //       position: {
    //         left: 0,
    //         top: 300 - 50,
    //         width: 50,
    //         height: 50
    //       },
    //       clickable: true
    //     }]
    //     that.setData({
    //       latitude: res.latitude,
    //       longitude: res.longitude,
    //       // polyline: polyline,
    //       // controls: controls,
    //       markers: markers
    //     })
    //   },
    // })
  },



})
// Page({
//   data: {
//     markers: [{
//       iconPath: '/images/icons/round.png',
//       id: 0,
//       latitude: 23.099994,
//       longitude: 113.324520,
//       width: 50,
//       height: 50
//     }],
//     // polyline: [{
//     //   points: [{
//     //     longitude: 113.3245211,
//     //     latitude: 23.10229
//     //   }, {
//     //     longitude: 113.324520,
//     //     latitude: 23.21229
//     //   }],
//     //   color: '#FF0000DD',
//     //   width: 2,
//     //   dottedLine: true
//     // }],
//     // controls: [{
//     //   id: 1,
//     //   iconPath: '/images/icons/round.png',
//     //   position: {
//     //     left: 0,
//     //     top: 300 - 50,
//     //     width: 50,
//     //     height: 50
//     //   },
//     //   clickable: true
//     // }]
//   },
//   regionchange(e) {
//     console.log(e.type)
//   },
//   markertap(e) {
//     console.log(e.markerId)
//   },
//   controltap(e) {
//     console.log(e.controlId)
//   }
// })