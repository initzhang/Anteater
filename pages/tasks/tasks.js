var backend_url = "http://127.0.0.1:5000/tasks";
const CHN = { "NER": "实体标注", "MT": "机器翻译", "POS": "词性标注" };

Page({
  /**
   * Page initial data
   */
  data: {
    news_list : []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // var news_list = [];
    this.get_Now();
  },

  get_Now(){
    var that = this;
    console.log("now header",getApp().globalData.header)
    wx.request({
      url: backend_url,
      method: 'GET',
      header : getApp().globalData.header,
      success: function (res) {
        console.log(res);
        if (res.data.code == 1) {
          // 登陆成功，保存tasks的json串到全局，后面直接在新页面使用
          getApp().globalData.tasks = res.data.tasks;
          // navigate任务列表界面
          that.setData({
            news_list: getApp().globalData.tasks
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

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  onTapNews:function (res) {
    console.log("点击的是：", res.currentTarget.dataset.idx)
    // 在跳转到具体annotate界面的时候，通过参数传递任务ID：TID
    wx.navigateTo({
      url: '../annotate/annotate?tid=' + getApp().globalData.tasks[res.currentTarget.dataset.idx].tid,
    })
  }
})