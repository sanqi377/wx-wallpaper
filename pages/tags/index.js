Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: []
    },

    // 点击图片事件
    imgInfo: function (e) {
        let index = e.target.dataset.index;
        wx.navigateTo({
            url: '/pages/imgInfo/index?index=' + index,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var tag = options.tag;
        var title = options.title;
        var that = this;
        var value = [];
        wx.setNavigationBarTitle({
            title: title
        })
        wx.$util.request({
            url: "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?per_page=15&access_token=YzZiNzA1ODVjYjAwYTA2NzQ0MDQwYzlkZTI1MWU3NDQ0NWUyNmEzMDVjNzNiMTk0MGJhMjNjZTVmODZhMWI2Mw&tags=" + tag + "&page=1"
        }).then(result => {
            let data = result.data;
            data.forEach(val => {
                (val.wallpaper).forEach(val1 => {
                    value.push(val1.full)
                })
            });
            that.setData({
                value
            })
            wx.setStorage({
                key: 'value',
                data: value
            })
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