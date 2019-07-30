// pages/user/qiye/qiye.js
var Entrance = require('../../../utils/common.js'); //通用js函数库
var getapp = getApp(); //app.js函数

Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this;
        var url = "?c=wxUser&a=qiyedata";
        Entrance.infodata(that,url, "加载中...");
    },

    //form表单提交
    formSubmit: function (e) {
        var url = "?c=wxUser&a=qiyeedit"; //提交接口地址
        Entrance.buttonsubmit(e.detail.value, url); //wx.request 函数
    },

})