var Entrance = require('../../utils/common.js'); //通用js函数库

Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var data = {
            id: options.id,
        };
        var url = "?c=wxList&a=dpeixundata";
        Entrance.infodata(that, url, "加载中...", data);
    },

    //form表单提交
    formSubmit: function (e) {
        var that = this;
        var url = "?c=wxBook&a=peixun_bm"; //提交接口地址
        e.detail.value.tid = that.data.data.id;
        Entrance.buttonsubmit(e.detail.value, url); //wx.request 函数
    },

})