//app.js
var Entrance = require('utils/common.js'); //通用js函数库

App({
    onLaunch: function () {
        var that = this;
        // 登录
        wx.login({
            success: function (res) {
                wx.showLoading({
                    title: "加载中...",
                    mask: true,
                })
                wx.request({
                    url: that.globalData.url + that.globalData.wx_url_1 + res.code,
                    success: res => {
                        if(res.data.status == "ok"){
                            that.globalData.openid = res.data.openid;
                            setTimeout(function () {
                                Entrance.pcuserInfoajax(that);
                                wx.hideLoading();
                            }, 100);
                        }else{
                            wx.hideLoading();
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
        })

        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }

                        },
                        fail: function () {

                        }
                    })
                }
                // else{
                //   wx.showModal({
                //     title: '警告',
                //     content: "尚未进行授权，请点击确定跳转到授权页面进行授权。",
                //     showCancel: false,
                //     confirmColor: "#299df4",
                //     confirmText: '确定',
                //     success: function (res) {
                //       if(res.confirm) {
                //         console.log('用户点击确定')
                //         wx.navigateTo({
                //           url: '../tologin/tologin',
                //         })
                //       }
                //     }
                //   })
                // }
            }
        })

        // 获取小程序更新机制兼容
        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(function () {
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })
                    updateManager.onUpdateFailed(function () {
                        // 新的版本下载失败
                        wx.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                        })
                    })
                }
            })
        } else {
            // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },

    globalData: {
        systemInfo: wx.getSystemInfoSync(),
        yuming: "https://ck.yiniu8.com", //全局接口地址
        url: "https://ck.yiniu8.com/api.php", //全局接口地址
        userInfo: [], //当前微信信息
        pcuserInfo: [], //绑定账号信息
        openid: 0, //微信id
        uid: 0,
        wx_url_1: '?c=wxConfig&a=indexConfig&code=', //回掉openid 接口地址
    },

})