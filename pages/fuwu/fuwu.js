var Entrance = require('../../utils/common.js'); //通用js函数库
// 请求数据
var page = 0;
var loadMore = function (that, call = "infolistReadyCallback") {
    page++;
    var infodata = {
        pagesize: 20,
        p: page,
        classid:that.data.classid,
    };
    var infourl = "?c=samples&a=fuwuList";
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
        classid:0,

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
        var classid = 0;
        that.setData({
            classid: classid,
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
            }
        }
        //设置当前页面高度
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight - 61
                });
            }
        });

        //二级栏目显示
        var catadata = {
            deep:4,
        };
        var cataurl = "?c=samples&a=fuwucata";
        Entrance.infodata(that, cataurl, "加载中...", catadata, "catalist");

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

    //更多栏目点击事件
    cataClic: function (e) {
        var that = this;
        page = 0;
        that.setData({
            list: [],
            scrollTop: 0,
            classid: e.target.id,
            num: e.target.dataset.num
        })
        setTimeout(function(){
            Entrance.infodata(that, "?c=samples&a=fuwucata", "加载中...", {deep:3,classid:that.data.classid}, "fidcatalist");
        },100);
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

})