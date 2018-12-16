// pages/dome/dome.js
const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        listName: '列表1',
        item: [{
          itemName: '子列表1-1',
          content: '1-1中的内容',
          time: '2015-05-06'
        }, {
          itemName: '子列表1-2',
          content: '1-2中的内容',
          time: '2015-04-13'
        }, {
          itemName: '子列表1-3',
          content: '1-3中的内容',
          time: '2015-12-06'
        }]
      },
      {
        listName: '列表2',
        item: [{
          itemName: '子列表2-1',
          content: '2-1中的内容',
          time: '2017-05-06'
        }, {
          itemName: '子列表2-2',
          content: '2-2中的内容',
          time: '2015-08-06'
        }, {
          itemName: '子列表2-3',
          content: '2-3中的内容',
          time: '2015-11-06'
        }]
      }, {
        listName: '列表3',
        item: [{
          itemName: '子列表3-1',
          content: '3-1中的内容',
          time: '2015-05-15'
        }, {
          itemName: '子列表3-2',
          content: '3-2中的内容',
          time: '2015-05-24'
        }, {
          itemName: '子列表1-3',
          content: '3-3中的内容',
          time: '2015-05-30'
        }]
      }
    ]
  },
  onLoad: function() {
    this.setData({
      navH: App.globalData.navHeight
    })
    console.log(this.data.navH)
    var timer = setInterval(this.showtime, 1000)

  },
  //点击最外层列表展开收起
  listTap(e) {
    console.log('触发了最外层');
    let Index = e.currentTarget.dataset.parentindex, //获取点击的下标值
      list = this.data.list;
    list[Index].show = !list[Index].show || false; //变换其打开、关闭的状态
    if (list[Index].show) { //如果点击后是展开状态，则让其他已经展开的列表变为收起状态
      this.packUp(list, Index);
    }

    this.setData({
      list
    });
  },
  //点击里面的子列表展开收起
  listItemTap(e) {
    let parentindex = e.currentTarget.dataset.parentindex, //点击的内层所在的最外层列表下标
      Index = e.currentTarget.dataset.index, //点击的内层下标
      list = this.data.list;
    console.log(list[parentindex].item, Index);
    list[parentindex].item[Index].show = !list[parentindex].item[Index].show || false; //变换其打开、关闭的状态
    if (list[parentindex].item[Index].show) { //如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开
      for (let i = 0, len = list[parentindex].item.length; i < len; i++) {
        if (i != Index) {
          list[parentindex].item[i].show = false;
        }
      }
    }
    this.setData({
      list
    });
  },

  
  //让所有的展开项，都变为收起
  packUp(data, index) {
    for (let i = 0, len = data.length; i < len; i++) { //其他最外层列表变为关闭状态
      if (index != i) {
        data[i].show = false;
        for (let j = 0; j < data[i].item.length; j++) { //其他所有内层也为关闭状态
          data[i].item[j].show = false;
        }
      }
    }
  },
  showLeftTime: function() {

    const that = this;
    var myDate = new Date();
    myDate.getYear(); //获取当前年份(2位)  
    myDate.getFullYear(); //获取完整的年份(4位,1970-????)  
    myDate.getMonth(); //获取当前月份(0-11,0代表1月)  
    myDate.getDate(); //获取当前日(1-31)  
    myDate.getDay(); //获取当前星期X(0-6,0代表星期天)  
    myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)  
    myDate.getHours(); //获取当前小时数(0-23)  
    myDate.getMinutes(); //获取当前分钟数(0-59)  
    myDate.getSeconds(); //获取当前秒数(0-59)  
    myDate.getMilliseconds(); //获取当前毫秒数(0-999)  
    myDate.toLocaleDateString(); //获取当前日期  
    var mytime = myDate.toLocaleTimeString(); //获取当前时间  
    myDate.toLocaleString(); //获取日期与时间  

    var toLocaleDateString = myDate.toLocaleDateString();
    var year = myDate.getFullYear();
    var month = myDate.getMonth();
    var day = myDate.getDate();
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    var seconds = myDate.getSeconds();
    let time = toLocaleDateString + "  " + hours + ":" + minutes + ":" + seconds + "";
    //一秒刷新一次显示时间
    // var timeID = setTimeout(showLeftTime, 1000);
    that.setData({
      time: time
    })
    console.log(toLocaleDateString)
  },
  showtime: function() {
    Date.prototype.Format = function(fmt) { //author: meizz 
      var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    // 调用：

    var time1 = new Date().Format("yyyy-MM-dd");
    var time2 = new Date().Format("yyyy/MM/dd hh:mm:ss");
    const that = this;
    that.setData({
      time: time2
    })
  }


})