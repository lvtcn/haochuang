// 判断是否是iOS系统平台
/**
 * 判断是否是苹果系统，是返回true
 * app 通过var app = getApp();获得
 */
function isIos(app) {
    var platform = app.globalData.systemInfo.platform;
    platform = platform.toLowerCase();
    console.log("isIos", platform);
    return platform.indexOf("ios") >= 0;
}

/**
 * 解决苹果端startPullDownRefresh不能触发onPullDownRefresh的问题
 * that  js文件的this
 * app
 */
function cusStartPullDownRefreh(that, app) {
    wx.startPullDownRefresh({});
    if (isIos(app)) {
        that.onPullDownRefresh();
    }
}

//用户信息提交函数
var usersubmit = function (data, url) {
    wx.showLoading({
        title: "提交中...",
        mask: true,
    })
    var getapp = getApp(); //app.js函数
    data.uid = getapp.globalData.uid;
    data.openid = getapp.globalData.openid;
    wx.request({
        url: getapp.globalData.url + url,
        method: "POST",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        success: function (data) {
            wx.hideLoading();
            if (data.data.status == 'ok') {
                wx.showToast({
                    title: data.data.msg,
                    icon: 'success',
                    duration: 1000,
                    success: function () {
                        getapp.globalData.pcuserInfo = data.data.data;
                        getapp.globalData.uid = data.data.data.id;
                        setTimeout(function () {
                            if (data.data.url != "") {
                                wx.switchTab({
                                    url: data.data.url,
                                })
                            }
                        }, 500)
                    },
                })
            } else if (data.data.status == 'error') {
                wx.showModal({
                    title: '提示',
                    content: data.data.msg,
                    showCancel: false,
                    confirmColor: "#299df4",
                    confirmText: '确定',
                    complete: function () {
                        if (data.data.url != "") {
                            wx.navigateTo({
                                url: data.data.url,
                            })
                        }
                    }
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: "对不起，系统超时，请稍后再试！",
                    showCancel: false,
                    confirmColor: "#299df4",
                    confirmText: '确定',
                })
            }
        },
        fail: function (res) {
            wx.showModal({
                title: '提示',
                content: "对不起，系统错误 100010 ！",
                showCancel: false,
                confirmColor: "#299df4",
                confirmText: '确定',
            })
        },
    })
}

//数据提交函数
var buttonsubmit = function (data = [], url, sltitle = "提交中...", that = "", call = "buttonReadyCallback") {
    wx.showLoading({
        title: sltitle,
        mask: true,
    })
    var getapp = getApp(); //app.js函数
    data.uid = getapp.globalData.uid;
    data.openid = getapp.globalData.openid;
    wx.request({
        url: getapp.globalData.url + url,
        method: "POST",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        success: function (data) {
            wx.hideLoading();
            if (data.data.status == 'ok') {
                if (data.data.msg != "" && data.data.msg != undefined && data.data.msg != null) {
                    wx.showToast({
                        title: data.data.msg,
                        icon: 'success',
                        duration: 1000,
                        success: function () {
                            setTimeout(function () {
                                if (data.data.url == "close") {
                                    wx.navigateBack();
                                } else if (data.data.url != "") {
                                    if (data.data.url == "/pages/user/index/index") {
                                        wx.switchTab({
                                            url: data.data.url,
                                        })
                                    } else if (data.data.code == "200") {
                                        wx.redirectTo({
                                            url: data.data.url,
                                        })
                                    } else {
                                        wx.navigateBack();
                                        wx.navigateTo({
                                            url: data.data.url,
                                        })
                                    }
                                }
                            }, 1000)
                        },
                    })
                }
                if (that !== "") {
                    if (that[call]) {
                        that[call](data)
                    }
                }
            } else if (data.data.status == 'error') {
                if (data.data.msg != "" && data.data.msg != undefined && data.data.msg != null) {
                    wx.showModal({
                        title: '提示',
                        content: data.data.msg,
                        showCancel: false,
                        confirmColor: "#299df4",
                        confirmText: '确定',
                        complete: function () {
                            if (data.data.url != "") {
                                wx.navigateTo({
                                    url: data.data.url,
                                })
                            }
                        }
                    })
                }
            } else {
                wx.showModal({
                    title: '提示',
                    content: "对不起，系统超时，请稍后再试！",
                    showCancel: false,
                    confirmColor: "#299df4",
                    confirmText: '确定',
                })
            }
        },
        fail: function (res) {
            wx.showModal({
                title: '提示',
                content: "对不起，系统错误 100010 ！",
                showCancel: false,
                confirmColor: "#299df4",
                confirmText: '确定',
            })
        },
    })
}


//获取验证码事件
var vssmst = 60; //发送验证码间隔时间
var t0 = function (that) {
    vssmst = vssmst - 1;
    if (vssmst <= 0) {
        that.setData({ //改变data值
            smsdom: "获取验证码",
            addClass: "",
            submit: "submit",
        })
        vssmst = 60;
        return;
    }
    that.setData({ //改变data值
        smsdom: vssmst + "s后重新发送",
    })
    setTimeout(function () {
        t0(that);
    }, 1000)
}

//发送验证码
var formSms = function (formdata, that, url) {
    var getapp = getApp(); //app.js函数
    formdata.openid = getapp.globalData.openid;
    wx.request({
        url: getapp.globalData.url + url,
        method: "GET",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: formdata,
        success: function (data) {
            if (data.data.status == "ok") {
                that.setData({ //改变data值
                    token: data.data.code,
                })
                wx.request({
                    url: getapp.globalData.url + "/api.php?c=sms&a=send",
                    method: "GET",
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        "mobile": formdata.mobile,
                        "token": data.data.code,
                    },
                    success: function (datas) {
                        if (datas.data.status == "ok") {
                            that.setData({ //改变data值
                                addClass: "disabled",
                                submit: "",
                            })
                            setTimeout(function () {
                                t0(that);
                            }, 1000)
                        }
                        wx.showToast({
                            title: datas.data.msg,
                            icon: 'success',
                            duration: 2000,
                        })
                    }
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: data.data.msg,
                    showCancel: false,
                    confirmColor: "#299df4",
                    confirmText: '确定',
                    complete: function () {
                        if (data.data.url != "") {
                            wx.navigateTo({
                                url: data.data.url,
                            })
                        }
                    }
                })
            }
        }
    })
}

//下拉导航
var toggleClass = function (that, id = "toggleClass") {
    if (that.data[id].MenuText == "show") { //判断 MenuText 让 MenuShow 显示 else 隐藏
        that.setData({ //改变data值
            [id]: {
                MenuShow: 'show',
                MenuText: 'hide'
            }
        })
    } else {
        that.setData({
            [id]: {
                MenuShow: 'hide',
                MenuText: 'show'
            }
        })
    }
}

//当前绑定账号信息
var pcuserInfoajax = function (that, call = "userInfoReadyCallback") {
    var getapp = getApp();
    wx.showLoading({
        title: "加载中...",
        mask: true,
    })
    wx.request({
        url: getapp.globalData.url + "?c=wxUser&a=bindingchklogin", //判断是否绑定账号接口地址
        method: "POST",
        header: {
            'content-type': 'application/x-www-form-urlencoded' //处理成from格式数据传递
        },
        data: {
            openid: getapp.globalData.openid, //openid
        },
        success: function (data) {
            if (data.data !== "") {
                wx.hideLoading();
                if (data.data.status == "ok") {
                    getapp.globalData.pcuserInfo = data.data.data; //当前绑定用户信息
                    getapp.globalData.uid = data.data.data.id; //当前绑定用户信息
                } else {
                    //未绑定数据赋值
                    var usdata = {
                        mobile: "未绑定账号", //账户名称
                        wxtouxiang: "/images/user/touxiang.png", //微信头像地址
                        navigateTourl: "/pages/binding/binding", //头像点击跳转链接
                    }
                    getapp.globalData.uid = 0;
                    getapp.globalData.pcuserInfo = usdata;
                }
                if (that[call]) {
                    that[call](data)
                }
            }
        }
    })
}

//判断是否绑定账号
var pcuserInfobinding = function (that) {
    var getapp = getApp(); //app.js函数
    if (getapp.globalData.uid == 0) {
        wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面
            url: getapp.globalData.pcuserInfo.navigateTourl, //url里面就写上你要跳到的地址
        })
        that.setData({
            pcuserInfo: getapp.globalData.pcuserInfo, //跳转链接
        })
        return false;
    }
}

//绑定成功状态给pcuserInfo赋值
var pcuserInfo = function (that) {
    var getapp = getApp(); //app.js函数
    if (getapp.globalData.uid != 0) {
        getapp.globalData.pcuserInfo.navigateTourl = "../geren/geren";//跳转链接
    }
    that.setData({
        pcuserInfo: getapp.globalData.pcuserInfo,
    })
}

//获取数据信息接口
var infodata = function (that, url, sltitle = "提交中...", data = [], dataname = "", method = "POST", call = "userInfoReadyCallback") {
    wx.showLoading({
        title: sltitle,
        mask: true,
    })
    var getapp = getApp(); //app.js函数
    data.uid = getapp.globalData.uid;
    data.openid = getapp.globalData.openid;
    wx.request({
        url: getapp.globalData.url + url,
        method: method,
        header: {
            'content-type': 'application/x-www-form-urlencoded' //处理成from格式数据传递
        },
        data: data,
        success: function (data) {
            wx.hideLoading();
            if (data.data.data != null) {
                that.setData({
                    pageshow: "show",
                    [dataname + "data"]: data.data.data,
                });

                if (that[call]) {
                    that[call](data)
                }
            }
        }
    })
}

//图片上传接口 ..批量上传
var uploadImages = function (that, click) {
    var getapp = getApp(); //app.js函数
    var id = click.currentTarget.id; //input标识
    wx.chooseImage({
        count: 1,  //最多可以选择的图片总数
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            //启动上传等待中...
            wx.showToast({
                title: '正在上传...',
                icon: 'loading',
                mask: true,
                duration: 10000
            })
            var uploadImgCount = 0;
            for (var i = 0, h = tempFilePaths.length; i < h; i++) {
                wx.uploadFile({
                    url: getapp.globalData.url + '?c=samples&a=wxUpload',
                    filePath: tempFilePaths[i],
                    name: 'file',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    formData: {
                        'imgIndex': i
                    },
                    success: function (ress) {
                        var data = JSON.parse(ress.data) //json转字符串
                        if (data.state == "SUCCESS") {
                            that.setData({
                                [id]: {
                                    url: getapp.globalData.yuming + data.url,
                                    valurl: data.url
                                }
                            })
                        } else {
                            wx.showModal({
                                title: '错误提示',
                                content: data.state,
                                showCancel: false,
                                success: function (res) {
                                }
                            })
                        }
                        uploadImgCount++;
                        //如果是最后一张,则隐藏等待中
                        if (uploadImgCount == tempFilePaths.length) {
                            wx.hideToast();
                        }
                    },
                    fail: function (res) {
                        wx.hideToast();
                        wx.showModal({
                            title: '错误提示',
                            content: '上传图片失败',
                            showCancel: false,
                            success: function (res) {
                            }
                        })
                    }
                });
            }
        }
    });
}


//下拉框数据接口
var optionAjax = function (that, url, id, num, val, placeholder = "请选择") {
    var getapp = getApp(); //app.js函数
    var data = [];
    data.uid = getapp.globalData.uid; //绑定用户id
    data.openid = getapp.globalData.openid; //当前微信id
    data.fid = val; //传递值
    wx.request({
        url: getapp.globalData.url + url,
        method: "POST",
        header: {
            'content-type': 'application/x-www-form-urlencoded' //处理成from格式数据传递
        },
        data: data,
        success: function (data) {
            var RangeArr = [];
            var RangeValueArr = [];
            that.setData({
                [id + "selectdata"]: {
                    num: num,
                    selectdata: data.data.data,
                }
            })

            if (data.data.data != null) {
                //一级下拉操作
                RangeArr.push(placeholder);
                RangeValueArr.push(0);
                for (var i = 0; i < that.data[id + "selectdata"].selectdata.length; i++) {
                    var classname = that.data[id + "selectdata"].selectdata[i].classname;
                    var classid = that.data[id + "selectdata"].selectdata[i].classid;
                    RangeArr.push(classname);
                    RangeValueArr.push(classid);
                }
                that.setData({
                    [id + "Range"]: RangeArr,
                    [id + "RangeValue"]: RangeValueArr,
                })
            }
            if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(data)
            }
        }
    })
}

var shouChangStatus = function (that, e, datamodel) {
    var getapp = getApp();
    var scstatus = e.currentTarget.dataset.scstatus;
    pcuserInfobinding(that);
    if (getapp.globalData.uid !== 0) {
        if (scstatus === 0) {
            scstatus = 1;
            that.setData({
                scstatus: scstatus,
            })
        } else {
            scstatus = 0;
            that.setData({
                scstatus: scstatus,
            })
        }
        var url = "?c=wxShoucang&a=add";
        var data = {
            aid: that.data.data.id,
            scstatus: scstatus,
            model: datamodel,
        };
        buttonsubmit(data, url);
    }
}

var del = function (that, e, url, txt, data = []) {
    var id = e.currentTarget.id;
    data.id = id;
    wx.showModal({
        title: '提示',
        content: txt,
        confirmColor: "#299df4",
        confirmText: '确定',
        complete: function (success) {
            if (success.confirm == true) {
                buttonsubmit(data, url);
                setTimeout(function () {
                    var arr = [];
                    for (var i in that.data.list) {
                        var item = that.data.list[i];
                        if (item.id != id) {
                            arr.push(item);
                        }
                    }
                    that.setData({
                        list: arr
                    });
                }, 500)
            }
        }
    })
}

module.exports = {
    cusStartPullDownRefreh: cusStartPullDownRefreh, //下拉判断是否是ios
    submit: usersubmit, //获取当前绑定账号信息函数
    buttonsubmit: buttonsubmit, //获取当前绑定账号信息函数
    formSms: formSms, //发送验证码函数
    clickToggleClass: toggleClass, //改变状态
    pcuserInfo: pcuserInfo, //给当前调用页面 pcuserInfo 赋值
    pcuserInfobinding: pcuserInfobinding, //没有绑定跳转接口
    pcuserInfoajax: pcuserInfoajax, //发送判断是否绑定成功请求接口
    infodata: infodata, //返回数据接口 data
    upimg: uploadImages, //上传图片接口
    optionAjax: optionAjax, //下拉框数据接口
    shouChangStatus: shouChangStatus, //收藏操作
    del: del, //删除操作
}