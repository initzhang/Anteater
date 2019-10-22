var backend_url = "http://127.0.0.1:5000/login";

Page({
  data: {
    toastHidden: true,
    modalHidden: true,
    errinfo: null
  },
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value)
    //  检查用户名
    if (e.detail.value.username == '') {
      that.setData({
        modalHidden: false,
        errinfo: "没有填写用户名！"
      })
      return;
    };
    //  检查密码
    if (e.detail.value.password == '') {
      that.setData({
        modalHidden: false,
        errinfo: "没有填写密码！"
      })
      return;
    };
    // 登陆的过程
    wx.request({
      url: backend_url,
      method : 'GET',
      data : {
        'username': e.detail.value.username,
        'password': e.detail.value.password
      },
      success:function(res){
        console.log(res);
        if(res.data.code==1){
          // 登陆成功，设置全局的header保存session ID
          getApp().globalData.header["Session"] = res.data.SID;
          console.log("已更新sessionID：", getApp().globalData.header["Session"]);
          // 保存tasks的json串到全局，后面直接在新页面使用
          //getApp().globalData.tasks = res.data.tasks;
          // navigate任务列表界面
          wx.redirectTo({
            url: '../tasks/tasks'
          })
        }else{
          that.setData({
            modalHidden: false,
            errinfo: "用户名或密码错误！"
          })
          return;
        }
      }
    })
  },
  resetModal: function () {
    var that = this;
    that.setData({
      modalHidden: true,
      errinfo: null
    })
  },
  Back: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  }
})
// var app = getApp()

// Page({
//   data: {
//     toastHidden: true
//   },
//   onLoad: function (options) {
//     console.log('Login Page Loaded');
//     console.log(app.globalData.userToken);
//   },
//   onReady: function () {
//     // 页面渲染完成
//   },
//   onShow: function () {
//     // 页面显示
//   },
//   onHide: function () {
//     // 页面隐藏
//   },
//   onUnload: function () {
//     // 页面关闭
//   },
//   formSubmit: function (e) {
//     console.log('form发生了submit事件，携带数据为：', e.detail.value);
//     //  检查用户名
//     if (e.detail.value.username == '') {
//       that.setData({
//         modalHidden: false,
//         errinfo: "没有填写用户名！"
//       })
//       return;
//     };
//     //  检查密码
//     if (e.detail.value.password == '') {
//       that.setData({
//         modalHidden: false,
//         errinfo: "没有填写密码！"
//       })
//       return;
//     };
//   },
//   Back: function () {
//     wx.redirectTo({
//       url: '../index/index'
//     })
//   }
// })

