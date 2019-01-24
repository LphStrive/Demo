var amapFile = require("../../utils/amap-wx.js");
Page({
  data: {
    markers: [{
      // iconPath: "../../img/mapicon_navi_s.png",
      id: 0,
      latitude: 39.989643,
      longitude: 116.481028,
      width: 23,
      height: 33
    }, {
      // iconPath: "../../img/mapicon_navi_e.png",
      id: 0,
      latitude: 39.90816,
      longitude: 116.434446,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: [],
    points:[]
  },
  onLoad: function() {
    var that = this;
    wx.getLocation({
      success: function(res) {
        that.setData({
          points: [{
            longitude: res.longitude,
            latitude: res.latitude
          }],
        })
        that.goToBus();
      },
    })
  
  },
  goDetail: function() {

  },
  // 驾车
  goToCar: function(e) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: 'f96cc98243c7637828a1ba2352dc25ec'
    });
    myAmapFun.getDrivingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function(data) {
        console.log(data)
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.taxi_cost) {
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }

      },
      fail: function(info) {

      }
    })
  },
  // 公交
  goToBus: function(e) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: 'f96cc98243c7637828a1ba2352dc25ec'
    });
    myAmapFun.getTransitRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      city: '北京',
      success: function(data) {
        console.log(data)
        var points = [];
        if (data && data.transits) {
          var transits = data.transits;
          for (var i = 0; i < transits.length; i++) {
            var segments = transits[i].segments;
            transits[i].transport = [];
            for (var j = 0; j < segments.length; j++) {
              if (segments[j].bus.buslines[0] && segments[j].bus.buslines[0].polyline) {
                var steps = segments[j].bus.buslines[0].polyline.split(';');
                for (var k = 0; k < steps.length; k++) {
                  var point = steps[k].split(',');
                  points.push({
                    longitude: point[0],
                    latitude: point[1]
                  })
                }
              }
            }
          }
        }
        console.log(point[0], point[1],that.data.points)
        // that.setData({
        //   polyline: [{
        //     points: points,
        //     color: "#0091ff",
        //     width: 6
        //   }]
        // });
        if (parseInt(point[0] * 100000) === parseInt(that.data.points[0].longitude * 100000) && parseInt(point[1] * 100000) === parseInt(that.data.points[0].latitude * 100000)) {

        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        }
      },
      fail: function(info) {

      }
    })
  },
  // 骑行
  goToRide: function(e) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: 'f96cc98243c7637828a1ba2352dc25ec'
    });
    myAmapFun.getRidingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function(data) {
        console.log(data)
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.taxi_cost) {
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }

      },
      fail: function(info) {

      }
    })
  },
  // 步行
  goToWalk: function(e) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: 'f96cc98243c7637828a1ba2352dc25ec'
    });
    myAmapFun.getWalkingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.paths[0] && data.paths[0].duration) {
          that.setData({
            cost: parseInt(data.paths[0].duration / 60) + '分钟'
          });
        }

      },
      fail: function(info) {

      }
    })

  }
})