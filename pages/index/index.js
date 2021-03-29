import url from "../../config/cofig.js"
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
        // loading 加载效果
        show: true,
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

    /*
     * 每日壁纸事件
     */
    ImgInfo: function (e) {
        var that = this;
        let type = e.target.dataset.type;
        let index = e.target.dataset.index;
        if (type == 'today') {
            var value = that.data.todayImg;
        } else if (type == 'index') {
            var value = that.data.hotImg;
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
        let key = e.detail.activeKey;
        var that = this;
        if (key == "hot") {
            wx.setStorage({
                key: 'type',
                data: "hot",
                success: function () {
                    that.setData({
                        show: true
                    })
                    wx.setStorage({
                        key: 'page',
                        data: 3,
                        success: function () {
                            wx.pageScrollTo({
                                scrollTop: 516
                            })
                            that.onReachBottom();
                        }
                    })
                }
            })
        } else if (key == "love") {
            wx.setStorage({
                key: 'type',
                data: "love",
                success: function () {
                    that.setData({
                        show: true
                    })
                    wx.setStorage({
                        key: 'page',
                        data: 3,
                        success: function () {
                            wx.pageScrollTo({
                                scrollTop: 516
                            })
                            that.onReachBottom();
                        }
                    })
                }
            })
        } else {
            wx.setStorage({
                key: 'type',
                data: "new",
                success: function () {
                    that.setData({
                        show: true
                    })
                    wx.setStorage({
                        key: 'page',
                        data: 3,
                        success: function () {
                            wx.pageScrollTo({
                                scrollTop: 516
                            })
                            that.onReachBottom();
                        }
                    })
                }
            })
        }
    },

    // 用户取消登录授权时
    clickCancel: function () {
        const toast = this.selectComponent('#my-dialog1');
        // 显示 Toast
        toast.linShow({
            title: '您取消了授权'
        });
    },
    // 用户确认授权时
    openAuth: function () {
        wx.login({
            success(res) {
                wx.request({
                    url: url + 'user/login',
                    method: 'POST',
                    data: {
                        code: res.code
                    },
                    success(res) {
                        wx.setStorage({
                            data: res.data.sessionKey,
                            key: 'sessionkey',
                        })
                        wx.setStorage({
                            data: res.data.id,
                            key: 'userid',
                        })
                    }
                })
            }
        })
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                wx.setStorage({
                    data: res.userInfo,
                    key: 'userinfo',
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that=this;
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
        wx.setStorage({
            key: 'type',
            data: 'hot',
            success: function () {
                wx.setStorage({
                    key: 'page',
                    data: 3,
                    success: function () {
                        that.onReachBottom();
                    }
                })
            }
        })

        // 获取每日壁纸
        let todayImg = []
        wx.$util.request({
            url: "https://wallpaper.zuimeix.com/wp-json/wp/v2/posts?sticky=true&per_page=15"
        }).then(result => {
            let data = result.data[0].wallpaper;
            data.forEach(val => {
                todayImg.push(val.full);
            });
            that.setData({
                todayImg,
            });
        })
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
        var that = this;
        let hotImg = [];
        wx.getStorage({
            key: 'page',
            success: function (res) {
                wx.getStorage({
                    key: 'type',
                    success: function (result) {
                        let type = result.data;
                        let page = res.data + 2;
                        if (type == "hot") {
                            if (page <= 90) {
                                wx.setStorage({
                                    key: 'page',
                                    data: page,
                                    success: function () {
                                        if (page > 5) {
                                            that.setData({
                                                buttomLoad: true
                                            })
                                        }
                                        wx.$util.request({
                                            url: "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=most&per_page=" + page
                                        }).then(result => {
                                            let data = result.data;
                                            data.forEach(val => {
                                                val.wallpaper.forEach(val => {
                                                    hotImg.push(val.full);
                                                })
                                            });
                                            that.setData({
                                                hotImg,
                                                show: false
                                            });
                                        })
                                    }
                                })
                            } else {
                                wx.$util.request({
                                    url: "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=most&per_page=99"
                                }).then(result => {
                                    let data = result.data;
                                    data.forEach(val => {
                                        val.wallpaper.forEach(val => {
                                            hotImg.push(val.full);
                                        })
                                    });
                                })
                            }
                        } else if (type == "love") {
                            if (page <= 90) {
                                wx.setStorage({
                                    key: 'page',
                                    data: page,
                                    success: function () {
                                        if (page > 5) {
                                            that.setData({
                                                buttomLoad: true
                                            })
                                        }
                                        wx.$util.request({
                                            url: "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?orderby=rand&per_page=" + page
                                        }).then(result => {
                                            let data = result.data;
                                            data.forEach(val => {
                                                val.wallpaper.forEach(val => {
                                                    hotImg.push(val.full);
                                                })
                                            });
                                            that.setData({
                                                hotImg,
                                                show: false
                                            });
                                        })
                                    }
                                })
                            } else {
                                wx.$util.request({
                                    url: "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?orderby=rand&per_page=99"
                                }).then(result => {
                                    let data = result.data;
                                    data.forEach(val => {
                                        val.wallpaper.forEach(val => {
                                            hotImg.push(val.full);
                                        })
                                    });
                                    that.setData({
                                        hotImg,
                                        buttom: true
                                    });
                                })
                                console.log("到底了")
                            }
                        } else {
                            if (page <= 90) {
                                wx.setStorage({
                                    key: 'page',
                                    data: page,
                                    success: function () {
                                        if (page > 5) {
                                            that.setData({
                                                buttomLoad: true
                                            })
                                        }
                                        wx.$util.request({
                                            url: "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?per_page=" + page
                                        }).then(result => {
                                            let data = result.data;
                                            data.forEach(val => {
                                                val.wallpaper.forEach(val => {
                                                    hotImg.push(val.full);
                                                })
                                            });
                                            that.setData({
                                                hotImg,
                                                show: false
                                            });
                                        })
                                    }
                                })
                            } else {
                                wx.$util.request({
                                    url: "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?per_page=99"
                                }).then(result => {
                                    let data = result.data;
                                    data.forEach(val => {
                                        val.wallpaper.forEach(val => {
                                            hotImg.push(val.full);
                                        })
                                    });
                                    that.setData({
                                        hotImg,
                                        buttom: true
                                    });
                                })
                                console.log("到底了")
                            }
                        }
                    }
                })
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})