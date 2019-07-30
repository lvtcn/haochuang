// pages/article/index/index.js
var Entrance = require('../../../utils/common.js'); //通用js函数库
var getapp = getApp();
var page = 1;
// 请求数据
var loadMore = function (that) {
    var infodata = {
        classid: that.data.classid,
        pagesize: 20,
        p: page,
    };
    var infourl = "?c=samples&a=infoList";
    Entrance.infodata(that, infourl, "加载中...", infodata, "info", "GET", "infolistReadyCallback");
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hidden: true,
        list: [],
        scrollTop: 0,
        scrollHeight: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        page = 0;
        that.setData({
            classid: options.classid,
        })
        loadMore(that); //发送加载请求
        that.infolistReadyCallback = res => { //赋值后进行数据处理
            var list = that.data.list;
            if (that.data.infodata != null) {
                for (var i = 0; i < that.data.infodata.length; i++) {
                    list.push(that.data.infodata[i]);
                }
                that.setData({
                    list: list
                });
                page++;
                that.setData({
                    hidden: true
                });
            }
        }
        //设置当前页面高度
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        });
    },

    /**
     * 页面上拉触底事件的处理函数
     */

    //页面滑动到底部
    bindDownLoad: function () {
        var that = this;
        loadMore(that);
    },

    scroll: function (event) {
        var that = this;
        //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
        that.setData({
            scrollTop: event.detail.scrollTop
        });
    },

})