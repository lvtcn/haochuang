var Entrance = require('../../utils/common.js'); //通用js函数库

Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var t = options.t;
        var id = options.id;
        that.setData({
            shopid: id,
            shopname: t,
        })
        var data = {
            id: that.data.shopid,
            t: that.data.shopname,
        };
        var url = "?c=wxOrder&a=index";
        Entrance.infodata(that, url, "加载中...", data);
    },

    //提交订单
    buttonOrder: function (e){
        var that = this;
        var data = {
            shopid: that.data.shopid,
            shopname: that.data.shopname,
            ordernumber:that.data.data.order.ordernumber,
        };
        var url = "?c=wxOrder&a=add";
        Entrance.buttonsubmit(data, url);
    },

    qxorder: function (e) {
        var that = this;
        var id = e.currentTarget.id;
        wx.showModal({
            title: '提示',
            content: "确定要取消此订单 ！",
            confirmColor: "#299df4",
            confirmText: '确定',
            complete: function(success){
                if(success.confirm == true){
                    Entrance.buttonsubmit({id:id},"?c=wxOrder&a=edit", "取消订单中");
                }
            }
        })
    },

})