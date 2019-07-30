// pages/user/banklist/banklist.js
var Entrance = require('../../../utils/common.js'); //通用js函数库

Page({

    /**
     * 页面的初始数据
     */
    data: {
        data:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
        var that = this;
        var url = "?c=wxUser&a=banklist";
        Entrance.infodata(that, url, "加载中...");
    },

    jbClick:function(e){
        var id = e.target.id;
        var url = "?c=wxUser&a=jbbank";
        var data = [];
        data.id = id;
        wx.showModal({
            title: '提示',
            content: "确定解绑该银行卡 ！",
            confirmColor: "#299df4",
            confirmText: '确定',
            complete: function(success){
                if(success.confirm == true){
                    Entrance.buttonsubmit(data, url);
                }
            }

        })
    }

})