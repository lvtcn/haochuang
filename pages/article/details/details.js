// pages/article/details/details.js
var Entrance = require('../../../utils/common.js'); //通用js函数库
var WxParse = require('../../../static/wxParse/wxParse.js'); //html富文本

Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id;
        var that = this;
        var data = {
            id: id,
        };
        var url = "?c=wxList&a=dinfodata";
        Entrance.infodata(that, url, "加载中...", data, "", "POST", "infouserInfoReadyCallback");
        that.infouserInfoReadyCallback = res => {
            var content = that.data.data.content;
            if(content != null){
                WxParse.wxParse("content", 'html', content, that, 5);
            }
        }
    },

})