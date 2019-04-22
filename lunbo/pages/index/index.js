const app = getApp();


Page({
  data: {
    Length: 6, //输入框个数 
    isFocus: true, //聚焦 
    Value: "", //输入的内容 
    ispassword: true, //是否密文显示 true为密文， false为明文。
    list: [{
        id: 1,
        name: "box1"
      },
      {
        id: 2,
        name: "box1"
      },
      {
        id: 3,
        name: "box1"
      },
      {
        id: 4,
        name: "box1"
      },
      {
        id: 5,
        name: "box1"
      },
      {
        id: 6,
        name: "box1"
      },
      {
        id: 7,
        name: "box1"
      },
      {
        id: 8,
        name: "box1"
      },
      {
        id: 9,
        name: "box1"
      },
      {
        id: 10,
        name: "box1"
      },
      {
        id: 11,
        name: "box1"
      },

    ],
    time: new Date()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    const that = this;
    console.log(that.data.time)
    let time = that.data.time.substring(0, 9)
    console.log(time)

    let arr = [];
    for (let i = 0; i < 5; i++) {
      const a = {}
      a.name = "name" + i
      a.id = "id" + i
      arr.push(a)
      console.log(arr)
    }
    
  },



  current: function(e) {
    const that = this;
    let current = e.detail.current;

    that.setData({
      current: current
    })


  },
  flexbg: function() {
    this.setData({
      show: true
    })
  },


  Focus(e) {
    var that = this;
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    that.setData({
      Value: inputValue,
    })
  },
  Tap() {
    var that = this;
    that.setData({
      isFocus: true,
    })
  },
  formSubmit(e) {
    console.log(e.detail.value.password);
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
  onShareAppMessage: function(options) {

  }
})