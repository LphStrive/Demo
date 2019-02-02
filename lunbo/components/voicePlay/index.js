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
      value: ""
    }
  },
  data:{
    play: false,
    startTime: "00:00",
    endTime: "",
  },
  methods:{
    // 播放
    play: function () {
      const that = this;
      that.endTime(that.data.endTime);
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
    // 暂停
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
      let finishTime = that.data.add || 0;
      let endTime = that.endTime(that.data.endTime);//结束时间转换格式
      that.setData({
        paly: true
      })
      timer = setInterval(function () {
        finishTime++;
        let width = (finishTime / endTime) * 300;
        that.setData({
          width: width,
          add: finishTime
        })
        that.addTime(finishTime);
        if (finishTime > endTime) {
          clearInterval(timer);
          innerAudioContext.stop()
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
    // 播放时间时间计算
    addTime: function (time) {
      const that=this;
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
    // 结束时间格式转换
    endTime: function (endTime){
      const that=this;
      let minute = endTime.substring(0,2)
      let second = endTime.substring(3,5);
      if (parseInt(minute)>0){
        let numTime = parseInt(minute) * 60 + parseInt(second);
        return numTime;
      }else{
        return parseInt(second);
      }
    }
  }
})