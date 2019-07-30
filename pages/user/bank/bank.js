// pages/user/bank/bank.js
var Entrance = require('../../../utils/common.js'); //通用js函数库
var getapp = getApp(); //app.js函数

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hid:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this;
        var url = "?c=samples&a=extcata";
        Entrance.optionAjax(that,url,"hid","null","62");
    },

    //form表单提交
    formSubmit: function (e) {
        var that = this;
        var url = "?c=wxUser&a=bank"; //提交接口地址
        var hid = that.data.hidRangeValue[e.detail.value.hid];
        e.detail.value.hid = hid;
        Entrance.buttonsubmit(e.detail.value, url); //wx.request 函数
    },

    PickerBindchange: function (e) {
        var id = e.target.id;
        this.setData({
            [id]: e.detail.value
        })
    },
})