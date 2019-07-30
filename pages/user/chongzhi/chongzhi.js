// pages/user/bank/bank.js
var Entrance = require('../../../utils/common.js'); //通用js函数库
var getapp = getApp(); //app.js函数

Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this;
    },

    //form表单提交
    formSubmit: function (e) {
        var that = this;
        Entrance.buttonsubmit(e.detail.value, "?c=wxUser&a=chongzhi", "提交中..",that,"chongzhiReadyCallback"); //wx.request 函数
        that.chongzhiReadyCallback = res => {
            if(res.data.status == "ok"){
                wx.navigateTo({
                    url:"../../order/order?t=chongzhi&id="+res.data.code,
                    t:"chongzhi"
                });
            }
        }
    },

})