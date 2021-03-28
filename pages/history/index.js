// pages/collect/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collectImg: []
    },
        /*
     * 点击壁纸事件
     */
    getImgInfo: function (e) {        
        wx.navigateTo({
            url: '/pages/imgInfo/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let imgArr = [];
        wx.getStorage({
            key: 'collect',
            success: (result) => {
                imgArr = result.data;
            }
        })
        wx.getStorage({
            key: 'value',
            success: (result) => {
                wx.getStorage({
                    key: 'index',
                    success: (res) => {
                        imgArr.unshift(result.data[res.data])
                        wx.setStorage({
                            data: imgArr,
                            key: 'collect',
                        })
                    }
                })
            },
        })
        wx.removeStorage({
            key: 'value',
        })
        setTimeout(() => {
            wx.getStorage({
                key: 'collect',
                success: (result) => {
                    this.setData({
                        collectImg: result.data
                    })
                }
            })
        }, 300);
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