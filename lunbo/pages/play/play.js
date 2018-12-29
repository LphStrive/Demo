// pages/play/play.js
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    play: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  play: function() {
    const that=this;
    let i = that.data.add||0;
    let time=20;
    timer = setInterval(function() {
      i++;
      let width = (i / time) * 500;
      that.setData({
        width: width,
        add:i
      })
      if(i>20){
        clearInterval(timer);
        that.setData({
          width: 0,
          add:0
        })
      }
    }, 1000)
    that.setData({
      play: true
    })
  },
  stop: function() {
    const that=this;
    clearInterval(timer);
    that.setData({
      // width: 0
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

 
})