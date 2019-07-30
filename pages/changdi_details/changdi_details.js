var Entrance = require('../../utils/common.js'); //通用js函数库
var WxParse = require('../../static/wxParse/wxParse.js'); //html富文本
var getapp = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //Banner配置
        Banner: {
            indicatorDots: true, //指点数
            vertical: false, //是否竖向
            autoplay: false, //是否自动播放
            circular: false, //衔接滑动
            interval: 3000, //自动播放间隔时长
            duration: 500, //幻灯片切换时长
            previousMargin: 0, //前边距(px)
            nextMargin: 0 //后边距(px)
        },
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
        var url = "?c=wxList&a=dchangdidata";
        Entrance.infodata(that, url, "加载中...", data, "", "POST", "infouserInfoReadyCallback");
        that.infouserInfoReadyCallback = res => {
            that.setData({
                scstatus: that.data.data.scstatus,
            })
            var content = that.data.data.content;
            if(content != null){
                WxParse.wxParse("content", 'html', content, that, 5);
            }
        }
    },

    //收藏操作
    shoucang: function (e) {
        var that = this;
        Entrance.shouChangStatus(that,e,"changdi");
    },

    //拨打电话操作
    calling:function(){
        var that = this;
        wx.makePhoneCall({
            phoneNumber: that.data.data.tel, //此号码并非真实电话号码，仅用于测试
        })
    }

})