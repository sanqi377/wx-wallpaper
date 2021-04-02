const app = getApp();
Page({
    data: {
        // 轮播图数据
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
        // 当前轮播图 Index
        swiperIndex: 0,
        // 当前页面的图片数据
        hotImg: [],
        // 底部加载完了效果
        buttom: false,
        // 底部加载中效果
        buttomLoad: false,
        // 今日壁纸
        todayImg: [],
        // 超过这个高度给热门、猜你、最新设置fixed
        scrollTop: null,
        // 提示用户登录的弹窗
        dialogShow: false,
        tabs: [{
                id: 0,
                key: "rank",
                title: "猜你喜欢",
                value: []
            },
            {
                id: 1,
                key: "hot",
                title: "热门壁纸",
                value: []
            },
            {
                id: 2,
                key: "new",
                title: "最新壁纸",
                value: []
            },
        ],
        page: 5,
        getStatus: true
    },

    clickSure: function () {
        app.sure();
    },
    onPageScroll: function (e) {
        this.setData({
            scrollTop: e.scrollTop,
        })
    },

    /**
     * 轮播滑动时，获取当前的轮播id
     */
    swiperChange(e) {
        var that = this;
        that.setData({
            swiperIndex: e.detail.current,
        })
    },

    //搜索事件
    clickSearch: function (value) {
        wx.navigateTo({
            url: '/pages/search/index?search=' + value.detail.value,
        })
    },

    /*
     * 点击壁纸事件
     */
    ImgInfo: function (e) {
        var index = e.target.dataset.index;
        var type = e.target.dataset.type;
        var activeType = this.data.type;
        var tabs = this.data.tabs;
        var that = this;
        var value = [];
        if (type == 'today') {
            value = that.data.todayImg;
        } else if (type == 'index') {
            tabs.forEach(val => {
                if (val.key == activeType) {
                    (val.value).forEach(val => {
                        value.push(val)
                    })
                }
            })
        }
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

    /*
     * 点击 Tabs 事件
     */
    changeTabs: function (e) {
        var page = this.data.page;
        var tabs = this.data.tabs;
        var that = this;
        var useValue = [];
        var reqStatus = true;
        if (typeof (e) == "string") {
            var type = e;
            that.setData({
                buttomLoad: true
            })
        } else {
            var type = e.detail.activeKey;
            if (type == this.data.type) {
                return;
            }
            tabs.forEach((val) => {
                if (val.key == type) {
                    if (val.value.length > 0) {
                        reqStatus = false;
                    } else {
                        that.setData({
                            buttomLoad: true
                        })
                    }
                }
            })
        }
        that.setData({
            type: type,
        })
        if (!reqStatus) {
            return
        }
        if (type == "rank") {
            page = 5;
        }
        wx.$util.req({
            data: {
                type: type,
                page: page
            },
            method: "POST",
            url: "api/gm"
        }).then((res) => {
            tabs.forEach((val, index) => {
                if (val.id == index) {
                    if (val.key == type) {
                        let data = res.data;
                        data.forEach(val1 => {
                            let data = {
                                src: val1.src,
                            };
                            useValue.push(data);
                        })
                        let value = 'tabs[' + val.id + '].value';
                        for (let i = 0; i <= 3; i++) {
                            if (i == val.id) {
                                var oldValue = that.data.tabs[i].value;
                            }
                        }
                        if (oldValue.length != 0) {
                            useValue = oldValue.concat(useValue);
                        }
                        that.setData({
                            [value]: useValue,
                            buttomLoad: false
                        })
                    }
                }
            })
            that.setData({
                getStatus: true,
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let type = "rank";
        this.setData({
            type: type
        })
        this.changeTabs(type)
        const that = this;
        wx.checkSession({
            success() {
                //session_key 未过期，并且在本生命周期一直有效
                that.setData({
                    dialogShow: false
                })
            },
            fail() {
                // session_key 已经失效，需要重新执行登录流程
                that.setData({
                    dialogShow: true
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var that = this;
        // 获取每日壁纸
        let todayImg = [];
        wx.$util.req({
            data: {},
            method: "POST",
            url: "api/mm/today"
        }).then((res) => {
            let data = res.data;
            data.forEach(val => {
                let data = {
                    src: val
                }
                todayImg.push(data);
            });
            that.setData({
                todayImg,
            });
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

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
            this.changeTabs(type);
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