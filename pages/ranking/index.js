Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 加载提示
        loading: true,
        // tabs 数据
        tabs: [{
                key: "download",
                name: "下载榜",
                value: []
            },
            {
                key: "new",
                name: "新品榜",
                value: []
            },
            {
                key: "collect",
                name: "收藏榜",
                value: []
            },
            {
                key: "hot",
                name: "热度榜",
                value: []
            }
        ],
        // type 类型
        type: null
    },

    changeTabs: function(e) {
        if(typeof(e) == "string") {
            var activeKey = e;
        } else {
            var activeKey = e.detail.activeKey;
        }
        var that = this;
        var value = that.data.tabs;
        if (activeKey ==  "download") {
            var rankapi = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=most&per_page=15&meta=downs";
            var value = that.data.tabs[0].value;
        } else if (activeKey == "new") {
            var rankapi = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=meta&date=year&per_page=15&page=1";
            var value = that.data.tabs[1].value;
        } else if (activeKey == "collect") {
            var rankapi = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=most&per_page=15&meta=favs&page=1";
            var value = that.data.tabs[2].value;
        } else {
            var rankapi = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=most&per_page=15&page=1";
            var value = that.data.tabs[3].value;
        }
        wx.$util.request({
            url: rankapi
        }).then(result => {
            let data = result.data;
            data.forEach(val => {
                let data = val.wallpaper;
                data.forEach(val => {
                    value.push(val.full)

                })
            });
            let tabs = that.data.tabs
            that.setData({
                tabs,
                loading: false
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let rankType = options.type;
        this.setData({
            type: rankType
        })
        this.changeTabs(rankType)
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