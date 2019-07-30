var Entrance = require('../../utils/common.js'); //通用js函数库

Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var t = options.t;
        var id = options.id;
        var data = {
            id: id,
            t: t,
        };
        var url = "?c=wxOrder&a=index";
        Entrance.infodata(that, url, "加载中...", data);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    //支付操作
    payment: function () {
        var that = this;
        var data = {
            ordernumber: that.data.data.order.ordernumber,
        };
        var url = "?c=wxPay&a=payWxIndex";
        Entrance.buttonsubmit(data, url, "发起支付中...", that, "payReadyCallback");
        that.payReadyCallback = res => {
            if(res.data.status == "ok"){
                wx.requestPayment({
                    'timeStamp': res.data.timeStamp,
                    'nonceStr': res.data.nonceStr,
                    'package': res.data.package,
                    'signType': 'MD5',
                    'paySign': res.data.paySign,
                    'success': function (res) {
                        wx.showModal({
                            title: '提示',
                            content: "支付成功 ！",
                            showCancel: false,
                            confirmColor: "#299df4",
                            confirmText: '确定',
                            complete: function (success) {
                                if (success.confirm == true) {
                                    wx.switchTab({
                                        url:"../user/index/index",
                                    })
                                }
                            }
                        })
                    },
                    'fail': function (res) {
                        wx.showModal({
                            title: '提示',
                            content: "已取消支付 ！",
                            showCancel: false,
                            confirmColor: "#299df4",
                            confirmText: '确定',
                        })
                    }
                })
            }
        }
    },

    //余额支付
    payUser: function () {
        var that = this;
        wx.showModal({
            title: '提示',
            content: "是否使用当前账户余额支付 ！",
            confirmColor: "#299df4",
            confirmText: '确定',
            cancelText: '取消',
            complete: function (success) {
                if (success.confirm == true) {
                    Entrance.buttonsubmit({ordernumber: that.data.data.order.ordernumber}, "?c=wxPay&a=payUser", "支付中...");
                }
                if (success.cancel == true) {
                    wx.showModal({
                        title: '提示',
                        content: "已取消支付 ！",
                        showCancel: false,
                        confirmColor: "#299df4",
                        confirmText: '确定',
                    })
                }
            }
        })
    },

    //跳转操作
    clickHref: function () {
        wx.showModal({
            title: '提示',
            content: "确定要离开收银台 ?",
            confirmText: '确定离开',
            confirmColor: "#0e8dd2",
            cancelText: '继续支付',
            complete: function (success) {
                if (success.confirm == true) {
                    wx.switchTab({
                        url:"../user/index/index",
                    })
                }
            }
        })
    }
})