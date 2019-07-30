// pages/user/fabu/fuwu/fuwu.js
var Entrance = require('../../../../utils/common.js'); //通用js函数库
var getapp = getApp(); //app.js函数

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dateValue:'请选择时间',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var url = "?c=samples&a=extcata";
        Entrance.optionAjax(that,url,"cidRange","null","8");
    },

    //开始时间
    datePickerBindchange:function(e){
        this.setData({
            dateValue:e.detail.value
        })
    },

    //图片上传
    uploadImages: function (click) {
        var that = this;
        Entrance.upimg(that,click);
    },

    //form表单提交
    formSubmit: function (e) {
        var url = "?c=wxFabu&a=huodong"; //提交接口地址
        Entrance.buttonsubmit(e.detail.value, url); //wx.request 函数
    },

})