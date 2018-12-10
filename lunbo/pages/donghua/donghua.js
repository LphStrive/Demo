Page({
  data: {
    imgUrls: [
      '/images/imgs/xq01.png',
      '/images/imgs/xq02.png', 
    ],
    swiperIndex: 0
  },
  swiperChange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  }
})
