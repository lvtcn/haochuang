var Entrance = require('../../../utils/common.js'); //通用js函数库
var getapp = getApp(); //app.js函数

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pcuserInfo: [],
        sex:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this;
        Entrance.pcuserInfo(that);
        if(getapp.globalData.pcuserInfo.sex == 1){
            that.setData({
                sex:[
                    {name:"1", value:"男", checked:"true"},
                    {name:"2", value:"女"}
                ]
            })
        }else if(getapp.globalData.pcuserInfo.sex == 2) {
            that.setData({
                sex:[
                    {name:"1", value:"男"},
                    {name:"2", value:"女", checked:"true"}
                ]
            })
        }else{
            that.setData({
                sex:[
                    {name:"1", value:"男"},
                    {name:"2", value:"女"}
                ]
            })
        }
    },

    //form表单提交
    formSubmit: function (e) {
        var url = "?c=wxUser&a=gerenedit"; //提交接口地址
        Entrance.submit(e.detail.value, url); //wx.request 函数
    },

    //图片上传
    uploadImages: function (click) {
        var that = this;
        Entrance.upimg(that,click);
    }

})