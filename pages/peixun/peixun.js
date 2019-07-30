var Entrance = require('../../utils/common.js'); //通用js函数库
var timer = require('../../static/wxTimer/wxTimer.js');
// 请求数据
var page = 0;
var loadMore = function (that, call = "infolistReadyCallback") {
    page++;
    var infodata = {
        pagesize: 10,
        p: page,
        keywords: that.data.keywords,
    };
    var infourl = "?c=samples&a=peixunList";
    setTimeout(function () {
        Entrance.infodata(that, infourl, "加载中...", infodata, "info", "POST", call);
    }, 500);
}

//开启第一个定时器
var wxtimers = function (that,wxTimer,time){
    wxTimer = new timer({
        beginTime:"10:21:12",
        name:wxTimer,
        complete:function(){
            console.log("完成了")
        }
    })
    wxTimer.start(that);
}
//倒计时
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //搜索操作
        keywords: 0,

        //栏目选择操作
        catalistdata: [],

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
        loadMore(that); //发送加载请求
        that.infolistReadyCallback = res => { //赋值后进行数据处理
            var list = that.data.list;
            if (that.data.infodata != null) {
                var TimerId = -1;
                for (var i = 0; i < that.data.infodata.length; i++) {
                    TimerId++;
                    list.push(that.data.infodata[i]);
                    that.setData({
                        wxTimerList:{
                            name:"wxTimer" + TimerId
                        }
                    })
                    setTimeout(function(){
                        wxtimers(that,"wxTimer"+TimerId,"");
                    },100)
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