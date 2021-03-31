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
        loading: true,
        // 页面默认加载页数
        page: 15,
        getStatus: true
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
            loading: true
        })
        var that = this;
        var value = that.data.tabs;
        var catId = that.data.catId;
        var page = this.data.page;
        value.forEach((val, index) => {
            if (val.key == activeKey) {
                if (!val.id) {
                    if (val.key == "jx") {
                        var api = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?orderby=rand&per_page=" + page + "&categories=" + catId
                    } else if (val.key == "new") {
                        var api = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?per_page=" + page + "&categories=" + catId
                    } else {
                        var api = "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=most&per_page=" + page + "&categories=" + catId
                    }
                } else {
                    var api = "https://wallpaper.zuimeix.com/wp-json/wp/v2/posts?categories=" + val.id + "&per_page=" + page
                }
                var useValue = [];
                wx.$util.request({
                    url: api
                }).then(result => {
                    let data = result.data;
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
                    let id = index;
                    let svalue = 'tabs[' + id + '].value';
                    that.setData({
                        [svalue]: useValue,
                        loading: false
                    })
                    wx.getSystemInfo({ // 获取页面可视区域的高度
                        success: (res) => {
                            this.setData({
                                height: res.screenHeight
                            })
                        },
                    })
                    that.showImg()
                })
            } else {
                let value = 'tabs[' + index + '].value';
                that.setData({
                    [value]: [],
                })
            }

        });
    },

    // 图片点击事件
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

    showImg: function () {
        let type = this.data.type;
        let tabs = this.data.tabs;
        let height = this.data.height;
        tabs.forEach(val => {
            if (type == val.key) {
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
        this.showImg()
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