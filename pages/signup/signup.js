var app = getApp()

Page({
  data: {
    toastHidden: true,
    modalHidden: true,
    errinfo: null
  },
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value.username)
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
  },
  resetModal: function () {
    var that = this;
    that.setData({
      modalHidden: true,
      errinfo: null
    })
  },
  Back:function(){
    wx.redirectTo({
      url: '../index/index',
    })
  }
})