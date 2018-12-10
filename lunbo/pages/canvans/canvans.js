// pages/canvans/canvans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sys = wx.getSystemInfoSync();
    let ratio = sys.screenWidth / 750;
    const ctx = wx.createCanvasContext('myCanvas');
    // let bgPath ="https://lingbei-1254264083.cos.ap-beijing.myqcloud.com/static/1111.png"
    let bgPath ="/images/imgs/bg.png"
    let maPath ="/images/imgs/ma.png"
    ctx.drawImage(bgPath, 0, 0, 750 * ratio, 1334 * ratio);

    ctx.setFontSize(37 * ratio);
    ctx.setFillStyle('#303030');
    ctx.setTextAlign('center');
    ctx.fillText('我已经在『因才教室』上了45堂课', 370 * ratio, 450 * ratio,);

    ctx.setFontSize(37 * ratio);
    ctx.setFillStyle('#303030');
    ctx.setTextAlign('center');
    ctx.fillText('忍不住把它推荐给你', 370 * ratio, 500 * ratio, );

    ctx.setFontSize(37 * ratio);
    ctx.setFillStyle('#303030');
    ctx.setTextAlign('center');
    ctx.fillText('快来和我一起『因才』施教', 370 * ratio, 550 * ratio, );

    ctx.drawImage(maPath, 272 * ratio, 600 * ratio, 206 * ratio, 206 * ratio);
   
    ctx.setFontSize(30 * ratio);
    ctx.setFillStyle('#303030');
    ctx.setTextAlign('center');
    ctx.fillText('长按识别小程序', 370 * ratio, 850 * ratio, );

    ctx.setFontSize(30 * ratio);
    ctx.setFillStyle('#303030');
    ctx.setTextAlign('center');
    ctx.fillText('领取50元上课时长', 370 * ratio, 890 * ratio, );
   
    ctx.draw();
  },

  saveImg: function () {
    const that = this;
    let sys = wx.getSystemInfoSync();
    let ratio = sys.screenWidth / 750;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 750 * ratio,
      height: 1334 * ratio,
      destWidth: 750,
      destHeight: 1334,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'none',
            })
          },
          fail: function (err) {
            that.setData({
              openState: true
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})