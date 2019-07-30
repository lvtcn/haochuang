// pages/index/index.js
var Entrance = require('../../utils/common.js'); //通用js函数库
//引用腾讯地图API
var QQMapWX = require('../../static/qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
var qqmapsdk;

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

        colunmlist: [
            {"classname": "找政策", "url": "../zhengce/zhengce", "iconsrc": "../../images/index/zhengce-icon.jpg"},
            {"classname": "找评测", "url": "../pingce/pingce", "iconsrc": "../../images/index/pingce-icon.jpg"},
            {"classname": "找培训", "url": "../peixun/peixun", "iconsrc": "../../images/index/peixun-icon.jpg"},
            {"classname": "找场地", "url": "../changdi/changdi", "iconsrc": "../../images/index/changdi-icon.jpg"},
            {"classname": "找资金", "url": "../zijin/zijin", "iconsrc": "../../images/index/zijin-icon.jpg"},
            {"classname": "找服务", "url": "../fuwu/fuwu", "iconsrc": "../../images/index/fuwu-icon.jpg"},
            {"classname": "找活动", "url": "../huodong/huodong", "iconsrc": "../../images/index/huodong-icon.jpg"},
            {"classname": "找产品", "url": "../product/product", "iconsrc": "../../images/index/product-icon.jpg"},
            {"classname": "创业卷", "url": "../chuangye/chuangye", "iconsrc": "../../images/index/chuangye-icon.jpg"},
            {"classname": "充值缴费", "url": "../user/chongzhi/chongzhi", "iconsrc": "../../images/index/chongzhi-icon.jpg"}
        ],

        //事件操作
        toggleClass: {
            MenuText: 'show', //class IF 操作
            MenuShow: 'hide' //菜单默认隐藏
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this;
        //首页数据接口
        Entrance.infodata(that, "?c=wxList&a=home", "加载中...");
    },

    //菜单按钮点击事件
    toggleClass: function () {
        var that = this;
        Entrance.clickToggleClass(that);
    },

    //栏目跳转
    hrefClick: function (e) {
        var that = this;
        var id = e.currentTarget.id;
        if (id == 5) {
            wx.switchTab({
                url: that.data.colunmlist[id].url,
            })
        } else {
            wx.navigateTo({
                url: that.data.colunmlist[id].url,
            })
        }
    },

    //tab跳转
    switnavi: function () {
        wx.switchTab({
            url: '../fuwu/fuwu'
        })
    },

    //打开地图
    onChangeAddress: function () {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            //此key需要用户自己申请
            key: 'MNXBZ-G5TWD-GYF42-HHZJL-2W2J3-PVBX4'
        });
        var that = this;
        // 调用接口
        qqmapsdk.reverseGeocoder({
            success: function (res) {
                console.log(res);
                that.setData({
                    address: res.result.address
                });
                //地址转坐标
                qqmapsdk.geocoder({
                    address: res.result.address,
                    success: function(res) {
                        console.log(res);
                    },
                    fail: function(res) {
                        console.log(res);
                    },
                });
            },
            fail: function (res) {
                console.log(res);
            },
        });
    }
})