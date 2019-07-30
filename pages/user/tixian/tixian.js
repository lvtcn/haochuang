// pages/user/tixian/tixian.js
var Entrance = require('../../../utils/common.js'); //通用js函数库
var getapp = getApp(); //app.js函数

Page({

  /**
   * 页面的初始数据
   */
  data: {
      jine:0,
      bankid:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = "?c=wxUser&a=dqbanklist";
    Entrance.optionAjax(that,url,"bankid","null","62", "请选择银行卡号"); //下拉框数据
    that.setData({
      jine: getapp.globalData.pcuserInfo.jine
    })
  },

  //form表单提交
  formSubmit: function (e) {
    var that = this;
    var url = "?c=wxUser&a=tixian"; //提交接口地址
    var bankid = that.data.bankidRangeValue[e.detail.value.bankid];
    e.detail.value.bankid = bankid;
    Entrance.submit(e.detail.value, url); //wx.request 函数
  },

  PickerBindchange: function (e) {
      var id = e.target.id;
      this.setData({
          [id]: e.detail.value
      })
  },

})