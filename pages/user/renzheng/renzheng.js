// pages/user/renzheng/renzheng.js
var Entrance = require('../../../utils/common.js'); //通用js函数库
var getapp = getApp(); //app.js函数

Page({

  /**
   * 页面的初始数据
   */
  data: {
      pcuserInfo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      Entrance.pcuserInfo(that);
  },
})