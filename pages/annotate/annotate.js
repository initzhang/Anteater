var backend_url = "http://127.0.0.1:5000/tasks/update";

// pages/annotate/annotate.js
Page({

  /**
   * Page initial data
   */
  data: {
    text_list : [],
    TID : 0,
    EID : 0,
    current_page : 0,
    total_page : 1,
    material : "日照香炉hhh",
    toastHidden : true,
    modalHidden: true,
    errinfo: null,
    INIT : ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // 获得的任务ID是：options.tid
    // 先保存下来TID
    this.setData({
      TID : options.tid
    })
    var that = this;
    // 这里直接在页面加载的时候发请求，获取具体的小任务
    wx.request({
      url: 'http://127.0.0.1:5000/tasks/task',
      data : {
        "tid" : options.tid
      },
      method: 'GET',
      header: getApp().globalData.header,
      success: function (res) {
        console.log("in_anno",res);
        if (res.data.code==1) {
          // 登陆成功，获得task的字符串，直接set显示！
          that.setData({
            text_list: res.data.entry,
            material: res.data.entry[0].source,
            total_page: res.data.entry.length,
            EID: res.data.entry[0].entry_id
          })
        } else {
          // 登陆失败，返回登陆界面
          that.setData({
            modalHidden: false,
            errinfo: "获取信息失败，请重新登陆！"
          })
          wx.redirectTo({
            url: '../login/login',
          })
          return;
        }
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },


  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value)

    if (e.detail.value.trans == '') {
      that.setData({
        modalHidden: false,
        errinfo: "请输入翻译内容！"
      })
      return;
    };

    // 存储label的过程
    wx.request({
      url: backend_url,
      method: 'GET',
      header: getApp().globalData.header,
      data : {
        "tid" : that.data.TID,
        "eid" : that.data.EID,
        "label" : e.detail.value.trans
      },
      success: function (res) {
        console.log(res);
        if (res.data.code != 1) {
          // 提交失败
          that.setData({
            modalHidden: false,
            errinfo: "提交失败，请稍后再次提交！"
          })
          return  
        } else {
          // 提交成功，刷新本页内容

          //!!!!!!!!! 判断是否是最后一页！！！！！！！
          
          if (that.data.current_page + 1 == that.data.total_page) {
            // 已经到了最后一页
            // 返回上一页即可
            that.setData({
              toastHidden: false
            }),
            wx.navigateTo({
              url: '../tasks/tasks',
            })
            return ;
          };

          that.setData({
            current_page: that.data.current_page + 1,
            material: that.data.text_list[that.data.current_page+1].source,
            INIT : ''
          })

          return;
        }
      }
    })
  },

  onTapReturn: function(){
    wx.navigateTo({
      url: '../tasks/tasks',
    })
  },

  resetModal: function () {
    var that = this;
    that.setData({
      modalHidden: true,
      errinfo: null
    })
  }
})