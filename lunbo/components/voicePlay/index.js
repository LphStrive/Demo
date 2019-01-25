var timer;
const innerAudioContext = wx.createInnerAudioContext();

Component({
  properties:{
    startTime:{
      type:String,
      value: "00:00",
    },
    endTime: {
      type: String,
      value: "01:20"
    },
    voiceSrc:{
      type: String,
      value: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46"
    }
  },
  data:{
    play: false,
    startTime: "00:00",
    endTime: "01:20",
  },
  methods:{
    play: function () {
      const that = this;

      innerAudioContext.autoplay = true
      innerAudioContext.src = that.data.voiceSrc;
      innerAudioContext.play();
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
      that.move(that)
    },
    stop: function () {
      const that = this;
      innerAudioContext.pause();
      innerAudioContext.onPause(() => {
        console.log('暂停播放')
      })
      clearInterval(timer);
      that.setData({
        paly: false
      })
    },
    // 进度条动画
    move: function (that) {
      let i = that.data.add || 0;
      let time = 80;
      that.setData({
        paly: true
      })
      timer = setInterval(function () {
        i++;
        let width = (i / time) * 300;
        that.setData({
          width: width,
          add: i
        })
        that.addTime(i, that);
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
    addTime: function (time, that) {
      let timeAfter = time.toString().padStart(2, '0');
      if (parseInt(timeAfter) < 60) {
        that.setData({
          startTime: "00:" + timeAfter
        })
      } else {
        let intTime = parseInt(timeAfter);
        let min = parseInt(intTime / 60);
        let minAfter = min.toString().padStart(2, '0');
        let second = parseInt(intTime % 60);
        let secondAfter = second.toString().padStart(2, '0');
        that.setData({
          startTime: minAfter + ":" + secondAfter
        })
      }
    },
  }
})