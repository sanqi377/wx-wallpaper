// pages/catsInfo/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                key: 'new',
                name: '最新',
                value: []
            },
            {
                key: 'jx',
                name: '精选',
                value: []
            },
            {
                key: 'hot',
                name: '热门',
                value: []
            }
        ],
        type: "jx",
        catId: null,
        loading: true
    },

    // 切换 Tabs 事件
    changeTabs: function (e) {
        if (typeof (e) == "string") {
            var activeKey = e;
        } else {
            var activeKey = e.detail.activeKey;
        }
        this.setData({
            type: activeKey,
        })
        var that = this;
        var value = that.data.tabs;
        var catId = that.data.catId;
        value.forEach(val => {
            if (val.key == activeKey) {
                if (!val.id) {
                    if (val.key == "jx") {
                        var api = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?orderby=rand&per_page=15&categories=" + catId
                        var value = val;
                    } else if (val.key == "new") {
                        var api = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?per_page=15&categories=" + catId
                        var value = val;
                    } else {
                        var api = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=most&per_page=15&categories=" + catId
                        var value = val;
                    }
                } else {
                    var api = "https://wallpaper.zuimeix.com/wp-json/wp/v2/posts?categories=" + val.id
                    var value = val;
                }
                wx.$util.request({
                    url: api
                }).then(result => {
                    let data = result.data;
                    data.forEach(val => {
                        let data = val.wallpaper;
                        data.forEach(val => {
                            value['value'].push(val.full)
                        })
                    });
                    let tabs = that.data.tabs
                    that.setData({
                        tabs,
                        loading: false
                    })
                })
            }
        });
    },

    // 图片点击事件
    imgInfo: function(e) {
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let catId = options.catid;
        var that = this;
        if (catId == 1) {
            wx.$util.request({
                url: "https://wallpaper.zuimeix.com/wp-json/wp/v2/categories?orderby=id&order=asc&per_page=50&hide_empty=true&parent=1"
            }).then(result => {
                let data = result.data;
                var tabs = this.data.tabs;
                data.forEach(val => {
                    let value = {
                        id: val.id,
                        name: val.name,
                        key: val.slug,
                        value: []
                    }
                    tabs.push(value)
                });
                that.setData({
                    tabs,
                    catId
                })
            })
        } else {
            that.setData({
                catId
            })
        }
        setTimeout(() => {
            this.changeTabs(this.data.type)
        }, 1000);
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