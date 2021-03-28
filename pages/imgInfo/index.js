// pages/imgInfo/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: [],
        index: null
    },

    back: function() {
        wx.navigateBack();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getStorage({
            key: 'value'?'value':'collect',
            success: function (res) {
                wx.getStorage({
                    key: 'index',
                    success: function (result) {
                        that.setData({
                            index: result.data,
                            value: res.data
                        })
                    }
                })
            },
            fail:function(){
                wx.getStorage({
                    key: 'collect',
                    success: function (res) {
                        wx.getStorage({
                            key: 'index',
                            success: function (result) {
                                that.setData({
                                    index: result.data,
                                    value: res.data
                                })
                            }
                        })
                    }
                })
            }
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