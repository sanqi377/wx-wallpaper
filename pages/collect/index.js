const {
    req
} = require("../../utils/util")

// pages/collect/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collectImg:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that=this;
        let imgArr=[];
        wx.getStorage({
            key: 'userid',
            success: function (res1) {
                req({
                    url: "user/getcollect",
                    method: "POST",
                    data: {
                        "userid": res1.data
                    }
                }).then(res2 => {
                    wx.setStorage({
                      data: res2.data,
                      key: 'coll',
                    })
                    that.setData({
                        collectImg:res2.data
                    })
                })
            }
        })
    },

    // 点击图片
    getImgInfo:function(e){
        let index = e.target.dataset.index;
        wx.navigateTo({
            url: '/pages/imgInfo/index?index='+index+'&coll='+true,
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})