var Entrance = require('../../../utils/common.js'); //通用js函数库
// 请求数据
var page = 0;
var loadMore = function (that, call = "infolistReadyCallback") {
    page++;
    var infodata = {
        pagesize: 10,
        p: page,
        t: that.data.t,
    };
    var infourl = "?c=wxBaoming&a=index";
    setTimeout(function () {
        Entrance.infodata(that, infourl, "加载中...", infodata, "info", "POST", call);
    }, 500);
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //栏目操作
        num: 0,
        t:"pingce",

        //上拉加载操作
        scrollTop: 0,
        scrollHeight: 0,
        list: [],

        //删除效果
        numhide:0,

        //栏目列表
        catalist:[
            {"classname":"找评测", "t":"pingce"},
            {"classname":"找培训", "t":"peixun"},
            {"classname":"找场地", "t":"changdi"},
            {"classname":"找资金", "t":"zijin"},
            {"classname":"找活动", "t":"huodong"},
        ],

        //事件操作
        moreClick: {
            MenuText: 'show', //class IF 操作
            MenuShow: 'hide' //菜单默认隐藏
        }
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
        loadMore(that);
        //动态设置当前页面的标题。
        wx.setNavigationBarTitle({
            title: '刷新中……'
        })

        wx.showNavigationBarLoading(); //在当前页面显示导航条加载动画。

        wx.hideNavigationBarLoading(); //隐藏导航条加载动画。

        wx.stopPullDownRefresh(); //停止当前页面下拉刷新。

        //动态设置当前页面的标题。
        wx.setNavigationBarTitle({
            title: '我的报名'
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

    //更多栏目
    moreClick: function (e) {
        var id = e.target.id;
        var that = this;
        Entrance.clickToggleClass(that, id);
    },

    //更多栏目点击事件
    cataClic: function (e) {
        page = 0;
        var that = this;
        that.setData({
            list: [],
            scrollTop: 0,
            t:e.target.dataset.t,
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
    del:function(e){
        var that = this;
        Entrance.del(that,e,"?c=wxBaoming&a=edit","确定删除该报名信息 ！",{t:that.data.t});
    }
})