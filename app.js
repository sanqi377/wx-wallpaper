wx.$util = require("./utils/util");
App({
    // 全局变量
    collect:{
        data:[]
    },
    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
<<<<<<< HEAD
        // wx.login({
        //     success(res) {
        //         if (res.code) {
        //             //发起网络请求
        //             wx.request({
        //                 url: 'https://test.com/onLogin',
        //                 data: {
        //                     code: res.code
        //                 }
        //             })
        //         } else {
        //             console.log('登录失败！' + res.errMsg)
        //         }
        //     }
        // })
=======

>>>>>>> b11b41765d67a23e5707208b92a12a3eaf72666b
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