Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 加载提示
        loading: true,
        // tabs 数据
        tabs: [
            {
                id: 0,
                key: "download",
                name: "下载榜",
                value: []
            },
            {
                id: 1,
                key: "new",
                name: "新品榜",
                value: []
            },
            {
                id: 2,
                key: "collect",
                name: "收藏榜",
                value: []
            },
            {
                id: 3,
                key: "hot",
                name: "热度榜",
                value: []
            }
        ],
        // type 类型
        type: null,
        // 页面显示高度
        height: null,
        // 页面默认加载页数
        page: 15,
        getStatus: true
    },

    // 进入大图
    imgInfo: function (e) {
        let index = e.currentTarget.dataset.index;
        let type = this.data.type;
        let tabs = this.data.tabs;
        var value = [];
        tabs.forEach(val => {
            if (val.key == type) {
                (val.value).forEach(val => {
                    value.push(val)
                })
            }
        })
        wx.setStorage({
            key: 'value',
            data: value,
            success: function () {
                wx.navigateTo({
                    url: '/pages/imgInfo/index?index=' + index,
                })
            }
        })
    },

    // 切换Tabs事件
    changeTabs: function (e) {
        if (typeof (e) == "string") {
            var activeKey = e;
        } else {
            var activeKey = e.detail.activeKey;
        }
        this.setData({
            loading: true,
            type: activeKey
        })
        var that = this;
        var value = that.data.tabs;
        var page = that.data.page;
        if (activeKey == "download") {
            var rankapi = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=most&per_page=" + page + "&meta=downs";
        } else if (activeKey == "new") {
            var rankapi = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=meta&date=year&per_page=" + page;
        } else if (activeKey == "collect") {
            var rankapi = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=most&per_page=" + page + "&meta=favs";
        } else {
            var rankapi = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=most&per_page=" + page;
        }
        var useValue = [];
        wx.$util.request({
            url: rankapi
        }).then(result => {
            let data = result.data;
            value.forEach((val, index) => {
                if (val.id == index) {
                    if (val.key == activeKey) {
                        data.forEach(val => {
                            let data = val.wallpaper;
                            data.forEach(val => {
                                let data = {
                                    src: val.full,
                                    show: false,
                                    def: "/public/img/img-default.jpeg"
                                };
                                useValue.push(data)
                            })
                        });
                        let id = val.id;
                        let value = 'tabs[' + id + '].value';
                        that.setData({
                            [value]: useValue,
                            loading: false
                        })
                    } else {
                        let value = 'tabs[' + val.id + '].value';
                        that.setData({
                            [value]: [],
                        })
                    }
                }
            })
            wx.getSystemInfo({ // 获取页面可视区域的高度
                success: (res) => {
                    this.setData({
                        height: res.screenHeight
                    })
                },
            })
            that.showImg(activeKey)
        })
    },

    showImg: function (rankType) {
        let tabs = this.data.tabs;
        let height = this.data.height;
        tabs.forEach(val => {
            if (rankType == val.key) {
                let data = val.value;
                wx.createSelectorQuery().selectAll('.item').boundingClientRect((ret) => {
                    ret.forEach((item, index) => {
                        if (item.top <= height) {
                            data[index].show = true
                        }
                    })
                    this.setData({
                        tabs
                    })
                }).exec()
            }
        })
    },

    onPageScroll: function () { // 滚动事件
        let type = this.data.type;
        this.showImg(type)
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
        var getStatus = this.data.getStatus;
        var page = this.data.page;
        var type = this.data.type;
        if (getStatus == true) {
            this.setData({
                getStatus: false,
                page: page + 5
            })
            setTimeout(() => {
                this.changeTabs(type);
            }, 500)
            this.setData({
                getStatus: true,
            })
            console.log(getStatus, "这里让它请求")
        } else {
            console.log(getStatus, "现在不请求")
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})