// pages/user/fabu/fuwu/fuwu.js
var Entrance = require('../../../../utils/common.js'); //通用js函数库
var getapp = getApp(); //app.js函数

Page({

    /**
     * 页面的初始数据
     */
    data: {
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
    },

    //图片上传
    uploadImages: function (click) {
        var that = this;
        Entrance.upimg(that,click);
    },

    //form表单提交
    formSubmit: function (e) {
        var url = "?c=wxFabu&a=fuwu"; //提交接口地址
        Entrance.buttonsubmit(e.detail.value, url); //wx.request 函数
    },

    toggleClass: function (e) {
        var that = this;
        that.optionClick(e);
        Entrance.clickToggleClass(that);
    },

    //下拉菜单操作
    optioncheck: function (e) {
        var that = this;
        var id = e.currentTarget.id;
        var num = e.currentTarget.dataset.num; //元素位置
        var val = e.currentTarget.dataset.value;
        var text = e.currentTarget.dataset.text;

        that.setData({
            [id]: {
                num: num,
                classid: val,
                classname: text
            }
        })
    },

    //多级点击操作
    optionClick: function (e) {
        var that = this;
        var val = e.currentTarget.dataset.value;
        var id = e.currentTarget.id; //元素id
        var num = e.currentTarget.dataset.num; //元素位置
        if(id == "cid1" || id == "cid2" || id == "cid3" || id == "qx"){
            that.setData({
                cid: {
                    num: null,
                    classid: null,
                    classname: null
                },
                cid3: {
                    num: null,
                    selectdata: [],
                }
            })
        }

        if(id != "qd"){
            Entrance.optionAjax(that,id,num,val);
        }
    },

})