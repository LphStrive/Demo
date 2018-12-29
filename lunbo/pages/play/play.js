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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})