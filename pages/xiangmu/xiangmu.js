var Entrance = require('../../utils/common.js'); //通用js函数库
// 请求数据
var page = 0;
var loadMore = function (that, call = "infolistReadyCallback") {
    page++;
    var infodata = {
        pagesize: 10,
        p: page,
        cid: that.data.cidRangeVlaue,
        guimo: that.data.guimoRangeVlaue,
        zijin: that.data.zijinRangeVlaue,
        keywords:that.data.keywords,
    };
    var infourl = "?c=samples&a=xiangmuList";
    setTimeout(function () {
        Entrance.infodata(that, infourl, "加载中...", infodata, "info", "POST", call);
    }, 500);
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 多条件搜索
        num: null,
        cid:0,
        guimo:0,
        zijin:0,
        keywords:0,


        //上拉加载操作
        scrollTop: 0,
        scrollHeight: 0,
        list: [],

        //事件操作
        toggleClass: {
            MenuText: 'show', //class IF 操作
            MenuShow: 'hide' //菜单默认隐藏
        },

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        page = 0;
        Entrance.optionAjax(that,"?c=samples&a=extcata","cid","null","40", "行业分类"); //下拉框数据
        Entrance.optionAjax(that,"?c=samples&a=extcata","guimo","null","41", "规模"); //下拉框数据
        Entrance.optionAjax(that,"?c=samples&a=extcata","zijin","null","7", "资金"); //下拉框数据
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
            }
        }
        //设置当前页面高度
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight - 105
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

    //菜单按钮点击事件
    toggleClass: function () {
        var that = this;
        Entrance.clickToggleClass(that);
    },

    //更多栏目
    moreClick: function (e) {
        var id = e.target.id;
        var that = this;
        Entrance.clickToggleClass(that, id);
    },

    //下拉
    PickerBindchange:function(e){
        var that = this;
        var id = e.target.id;
        var val = e.detail.value;
        that.setData({
            [id]:val
        })
        that.cataClic(e,id,val);
    },

    //更多栏目点击事件
    cataClic: function (e,id,val) {
        page = 0;
        var that = this;
        that.setData({
            list: [],
            [id+"RangeVlaue"]:that.data[id+"RangeValue"][val],
            scrollTop: 0,
            num: e.target.dataset.num,
        })
        loadMore(that, "catainfolistReadyCallback");
        that.catainfolistReadyCallback = res => { //赋值后进行数据处理
            if (that.data.infodata.length != 0) {
                that.setData({
                    list: that.data.infodata,
                })
            } else {
                that.setData({
                    list: 0,
                })
            }
        }
    },

    //搜索操作
    watchPassWord: function (event) {
        var that = this;
        page = 0;
        that.setData({
            list: [],
            keywords: event.detail.value,
        })
        loadMore(that);
    }

})