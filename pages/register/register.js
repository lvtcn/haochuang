// pages/register/register.js
var Entrance = require('../../utils/common.js'); //通用js函数库
var getapp = getApp(); //app.js函数

Page({

    /**
     * 页面的初始数据
     */
    data: {
        token: "",
        addClass: "",
        smsdom: "获取验证码",
        submit: "submit",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    //获取验证码事件
    formSms: function (e) {
        var that = this;
        Entrance.formSms(e.detail.value, that, "/api.php?c=home&a=chkuname"); //wx.request 函数
    },

    //form表单提交
    formSubmit: function (e) {
        var url = "?c=home&a=reg"; //提交接口地址
        Entrance.submit(e.detail.value, url); //wx.request 函数
    }

})