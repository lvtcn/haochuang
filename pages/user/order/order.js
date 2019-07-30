var Entrance = require('../../../utils/common.js'); //通用js函数库
// 请求数据
var page = 0;
var loadMore = function (that, call = "infolistReadyCallback") {
    page++;
    var infodata = {
        pagesize: 10,
        p: page,
        status:that.data.status,
    };
    var infourl = "?c=wxOrder&a=lists";
    setTimeout(function () {
        Entrance.infodata(that, infourl, "加载中...", infodata, "info", "POST", call);
    }, 100);
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //栏目操作
        num: 0,
        status:0,

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
        page = 0;
        var that = this;
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
                    scrollHeight: res.windowHeight - 41
                });
            }
        });
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        var that = this;
        page = 0;
        that.setData({
            list: []
        });
        loadMore(that); //发送加载请求
        //动态设置当前页面的标题。
        wx.setNavigationBarTitle({
            title: '刷新中……'
        })

        wx.showNavigationBarLoading(); //在当前页面显示导航条加载动画。

        wx.hideNavigationBarLoading(); //隐藏导航条加载动画。

        wx.stopPullDownRefresh(); //停止当前页面下拉刷新。

        //动态设置当前页面的标题。
        wx.setNavigationBarTitle({
            title: '我的订单'
        })
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
        page = 0;
        var that = this;
        that.setData({
            list: [],
            scrollTop: 0,
            status: e.target.dataset.status,
            num: e.target.dataset.num
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

    //删除操作
    del: function (e){
        var that = this;
        Entrance.del(that,e,"?c=wxOrder&a=del","确定要删除此订单 ！");
    }
})