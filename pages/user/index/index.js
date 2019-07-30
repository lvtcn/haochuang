var Entrance = require('../../../utils/common.js'); //通用js函数库
var getapp = getApp(); //app.js函数
var cs = 0;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: 0,
        pcuserInfo: [], //当前绑定账号信息
        catalist: [
            {
                "classid": 1,
                "classname": "账户设置",
                "classicon": "icon-shezhi",
                fidlist: [
                    {"classid": 1, "classname": "个人资料维护", "url": "../geren/geren"},
                    {"classid": 2, "classname": "账户管理", "url": "../zhanghu/zhanghu"},
                    {"classid": 3, "classname": "企业资料维护", "url": "../qiye/qiye"},
                ]
            },
            {
                "classid": 2,
                "classname": "认证中心",
                "classicon": "icon-cgong2",
                fidlist: [
                    {"classid": 1, "classname": "认证类型", "url": "../renzheng/renzheng"},
                ]
            },
            {
                "classid": 3,
                "classname": "资金管理",
                "classicon": "icon-refund",
                fidlist: [
                    {"classid": 1, "classname": "我的银行卡", "url": "../banklist/banklist"},
                    {"classid": 2, "classname": "资金明细", "url": "../zijin/zijin"},
                ]
            },
            // {
            //     "classid": 4,
            //     "classname": "我要发布",
            //     "classicon": "icon-edit",
            //     fidlist: [
            //         {"classid": 1, "classname": "服务发布", "url": "../fabu/fuwu/fuwu"},
            //         {"classid": 2, "classname": "活动发布", "url": "../fabu/huodong/huodong"},
            //         {"classid": 3, "classname": "培训发布", "url": "../fabu/peixun/peixun"},
            //         {"classid": 4, "classname": "产品发布", "url": "../fabu/product/product"},
            //         {"classid": 5, "classname": "项目发布", "url": "../fabu/bank/bank"},
            //         {"classid": 6, "classname": "我的发布", "url": "../fabu/zijin/zijin"},
            //     ]
            // },
            // {
            //     "classid": 5,
            //     "classname": "我的毫创金币",
            //     "classicon": "icon-wodezhanghu",
            //     fidlist: [
            //         {"classid": 1, "classname": "金币明细", "url": "../jinbi/jinbi"},
            //     ]
            // },
            // {
            //     "classid": 6,
            //     "classname": "我的积分",
            //     "classicon": "icon-qian1",
            //     fidlist: [
            //         {"classid": 1, "classname": "积分明细", "url": "../jifen/jifen"},
            //     ]
            // },
        ], //个人中心菜单数据
        catainfo: [], //当前用户拥有菜单数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this;
        Entrance.pcuserInfobinding(that); //是否绑定 绑定成功赋值
        that.menuUser();
    },

    /**
     * 页面显示函数
     */
    onShow: function () {
        var that = this;
        if (getapp.globalData.uid != 0) {
            cs++;
            if (cs < 2) {
                Entrance.pcuserInfo(that); //给当前data pcuserInfo 赋值
                that.menuUser(); //刷新个人中心菜单
            }
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        var that = this;
        Entrance.pcuserInfoajax(that, "userReadyCallback");  //发送给app.js 赋值用户信息接口
        Entrance.pcuserInfo(that); //给当前data pcuserInfo 赋值
        that.menuUser(); //刷新个人中心菜单

        //动态设置当前页面的标题。
        wx.setNavigationBarTitle({
            title: '刷新中……'
        })

        wx.showNavigationBarLoading(); //在当前页面显示导航条加载动画。

        wx.hideNavigationBarLoading(); //隐藏导航条加载动画。

        wx.stopPullDownRefresh(); //停止当前页面下拉刷新。

        //动态设置当前页面的标题。
        wx.setNavigationBarTitle({
            title: '个人中心'
        })

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    //下拉事件
    toggleClass: function (e) {
        var that = this;
        if (e.target.dataset.num != undefined) {
            that.setData({
                num: e.target.dataset.num
            })
        }
    },

    //个人中心菜单赋值
    menuUser: function () {
        var that = this;
        that.setData({
            catainfo: []
        });

        var catainfo = that.data.catainfo;
        var catalist = that.data.catalist;
        // push 拼接数组
        for (var i = 0; i < catalist.length; i++) {
            //账户设置菜单 数据处理
            if (catalist[i].classid == 1) { //是否是
                if (getapp.globalData.pcuserInfo.isoklx != 2) { //判断是不是个人认证 不显示企业资料维护
                    var fildlist = [];
                    for (var j = 0; j < catalist[i].fidlist.length; j++) {
                        if (catalist[i].fidlist[j].classid < 3) {
                            fildlist.push(catalist[i].fidlist[j]); //个人用户 二级菜单显示
                        } else {
                            fildlist.push();
                        }
                    }
                    catalist[i].fidlist = fildlist;
                }
            }

            //我要发布菜单 数据处理
            if (catalist[i].classid == 4) { //是否是
                if (getapp.globalData.pcuserInfo.isok == 2) { //判断当前绑定账号是否认证成功
                    if (getapp.globalData.pcuserInfo.isoklx == 1) { //判断当前绑定账号是否是个人
                        var fildlistfabu = [];
                        for (var j = 0; j < catalist[i].fidlist.length; j++) {
                            if (catalist[i].fidlist[j].classid > 4) {
                                fildlistfabu.push(catalist[i].fidlist[j]); //个人用户 二级菜单显示
                            } else {
                                fildlistfabu.push();
                            }
                        }
                        catalist[i].fidlist = fildlistfabu;
                    }
                    catainfo.push(catalist[i]); // 认证成功显示菜单
                } else {
                    catainfo.push(); //没有认证 [我要发布] 菜单不显示
                }
            } else {
                catainfo.push(catalist[i]);
            }
        }
        that.setData({
            catalist: catalist,
        })
        for (var i = 0; i < catalist.length; i++) {
            //用户绑定跳转 /pages/binding/binding
            if (getapp.globalData.uid == 0) {
                for (var j = 0; j < catainfo[i].fidlist.length; j++) {
                    catainfo[i].fidlist[j].url = getapp.globalData.pcuserInfo.navigateTourl;
                }
            } else {
                for (var j = 0; j < catainfo[i].fidlist.length; j++) {
                    catainfo[i].fidlist[j].url = catalist[i].fidlist[j].url;
                }
            }
        }

        that.setData({
            catainfo: catainfo,
        })
    }
})