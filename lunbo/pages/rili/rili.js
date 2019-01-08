// page/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // arr: [],
    // sysW: null,
    // lastDay: null,
    // firstDay: null,
    // weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    // year: null
    year: '',
    month: '',
    day: '',
    weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    firstDay: '',
    lastDay: '',
    param: null,
    clockNum: 3,
  },

  // //获取日历相关参数
  // dataTime: function () {
  //   var date = new Date();
  //   var year = date.getFullYear();
  //   var month = date.getMonth();
  //   var months = date.getMonth() + 1;

  //   //获取现今年份
  //   this.data.year = year;

  //   //获取现今月份
  //   this.data.month = months;

  //   //获取今日日期
  //   this.data.getDate = date.getDate();

  //   //最后一天是几号
  //   var d = new Date(year, months, 0);
  //   this.data.lastDay = d.getDate();

  //   //第一天星期几
  //   let firstDay = new Date(year, month, 1);
  //   this.data.firstDay = firstDay.getDay();
  // },

  // onLoad: function (options) {
  //   this.dataTime();

  //   //根据得到今月的最后一天日期遍历 得到所有日期
  //   for (var i = 1; i < this.data.lastDay + 1; i++) {
  //     this.data.arr.push(i);
  //   }
  //   var res = wx.getSystemInfoSync();
  //   this.setData({
  //     // 更具屏幕宽度变化自动设置宽度
  //     sysW: res.windowHeight / 12, 
  //     marLet: this.data.firstDay,
  //     arr: this.data.arr,
  //     year: this.data.year,
  //     getDate: this.data.getDate,
  //     month: this.data.month
  //   });
  // }
  getDate: function () { //获取当月日期
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth();
    var months = month + 1;
    this.data.year = year;
    this.data.month = months;
    this.data.day = mydate.getDate();
    var fist = new Date(year, month, 1);
    this.data.firstDay = fist.getDay();
    var last = new Date(year, months, 0);
    this.data.lastDay = last.getDate();

    this.setData({
      year: this.data.year,
      month: this.data.month,
      day: this.data.day,
      firstDay: this.data.firstDay,
      lastDay: this.data.lastDay
    })
    console.log("今天：" + this.data.day);
  },
  setDate: function () {
    for (var i = 1; i < this.data.lastDay + 1; i++) {
      this.data.dateArr.push(i);
    }
    this.setData({
      dateArr: this.data.dateArr,
      firstDay: this.data.firstDay
    })
  },
  prevMonth: function () { //上一月
    var months = "";
    var years = "";
    if (this.data.month == 1) {
      years = this.data.year - 1
      this.data.month = 12;
      months = this.data.month;
    } else {
      years = this.data.year;
      months = this.data.month - 1;
    }

    var first = new Date(years, months - 1, 1);
    this.data.firstDay = first.getDay();
    var last = new Date(years, months, 0);
    this.data.lastDay = last.getDate();

    this.setData({
      month: months,
      year: years,
      firstDay: this.data.firstDay,
      lastDay: this.data.lastDay
    })

    this.data.dateArr = [];
    for (var i = 1; i < this.data.lastDay + 1; i++) {
      this.data.dateArr.push(i);
    }
    this.setData({
      dateArr: this.data.dateArr
    })
  },
  nextMonth: function () { //下一月
    var months = "";
    var years = "";
    if (this.data.month == 12) {
      this.data.month = 0;
      months = this.data.month;
      years = this.data.year + 1;
    } else {
      months = this.data.month + 1;
      years = this.data.year;
    }
    var months = this.data.month + 1;
    var first = new Date(years, months - 1, 1);
    this.data.firstDay = first.getDay();
    var last = new Date(years, months, 0);
    this.data.lastDay = last.getDate();
    this.setData({
      month: months,
      year: years,
      firstDay: this.data.firstDay,
      lastDay: this.data.lastDay
    })

    this.data.dateArr = [];
    for (var i = 1; i < this.data.lastDay + 1; i++) {
      this.data.dateArr.push(i);
    }
    this.setData({
      dateArr: this.data.dateArr
    })
  },
  onLoad: function (options) {
    this.getDate();
    this.setDate();
    var res = wx.getSystemInfoSync();
    this.setData({
      param: res.windowHeight / 14,
    })
  }




})
