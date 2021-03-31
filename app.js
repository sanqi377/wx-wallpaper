wx.$util = require("./utils/util");
import serverPath from "./config/cofig.js"
App({
    // 全局变量
    collect: {
        data: []
    },
    cond:{
        data:true
    },
    
    _cancelEvent() {
    },
    //确认事件
    sure() {
        wx.login({
            success(res) {
                wx.request({
                    url: serverPath.serverPath + 'user/login',
                    method: 'POST',
                    data: {
                        code: res.code
                    },
                    success(res) {
                        wx.setStorage({
                            data: res.data.sessionKey,
                            key: 'sessionkey',
                        })
                        wx.setStorage({
                            data: res.data.id,
                            key: 'userid',
                        })
                        wx.showToast({
                            title: '登录成功',
                        })
                    },
                })
            }
        })
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                wx.setStorage({
                    data: res.userInfo,
                    key: 'userinfo',
                })
            }
        })
    },
    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
    },

    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function (options) {

    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function () {

    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function (msg) {

    }
})