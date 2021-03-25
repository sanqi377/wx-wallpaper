Page({

    /**
     * 页面的初始数据
     */
    data: {
        img: [{
                src: "../../public/img/1.jpg"
            },
            {
                src: "../../public/img/2.jpg"
            },
            {
                src: "../../public/img/3.jpg"
            }
        ],
        hotImg: []
    },

    changeTabs: function (e) {
        if (typeof e == "undefined") {
            var that = this;
            let hotImg = [];
            wx.request({
                url: 'http://m.bcoderss.com/wp-json/wp/v2/posts?per_page=10&page=1',
                method: 'GET',
                success: function (res) {
                    let data = res.data;
                    data.forEach(val => {
                        hotImg.push(val.content);
                    });
                    that.setData({
                        hotImg
                    })
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.changeTabs();
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