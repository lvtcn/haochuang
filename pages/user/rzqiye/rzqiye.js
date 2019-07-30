// pages/user/rzqiye/rzqiye.js
var Entrance = require('../../../utils/common.js'); //通用js函数库
var getapp = getApp(); //app.js函数

Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    //form表单提交
    formSubmit: function (e) {
        var url = "?c=wxUser&a=rzqiye"; //提交接口地址
        if(e.detail.value.biaoqian1 != "" && e.detail.value.biaoqian2 != "" && e.detail.value.biaoqian3 != "" && e.detail.value.biaoqian4 != ""){
            e.detail.value.biaoqian = e.detail.value.biaoqian1 + "," + e.detail.value.biaoqian2 + "," + e.detail.value.biaoqian3 + "," + e.detail.value.biaoqian4;
        }
        Entrance.submit(e.detail.value, url); //wx.request 函数
    },

    uploadImages: function (click) {
        var that = this;
        Entrance.upimg(that,click);
    }

})