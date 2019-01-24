// pages/play/play.js
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    play: false,
    startTime:"00:00",
    endTime:"01:20"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  play: function() {
    const that = this;
    that.move(that)
  },
  stop: function() {
    const that = this;
    clearInterval(timer);
    that.setData({
      paly: false
    })
  },
  // 进度条动画
  move: function(that) {
    let i = that.data.add || 0;
    let time = 80;
    that.setData({
      paly: true
    })
    timer = setInterval(function() {
      i++;
      let width = (i / time) * 300;
      that.setData({
        width: width,
        add: i
      })
      that.addTime(i,that);
      if (i > 79) {
        clearInterval(timer);
        that.setData({
          width: 0,
          add: 0,
          startTime: "00:00",
          paly: false
        })
      }
    }, 1000)
    that.setData({
      play: true
    })
  },
  // 时间计算
  addTime:function(time,that){
    let timeAfter = time.toString().padStart(2,'0');
    if (parseInt(timeAfter)<60){
      that.setData({
        startTime: "00:" + timeAfter
      })
    }else{
      let intTime = parseInt(timeAfter);
      let min = parseInt(intTime/60);
      let minAfter = min.toString().padStart(2, '0');
      let second = parseInt(intTime%60);
      let secondAfter = second.toString().padStart(2, '0');
      that.setData({
        startTime: minAfter + ":" + secondAfter
      })
    }
  },


  onShow: function() {

  },


})