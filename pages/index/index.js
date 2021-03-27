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
        hotImg: [],
        show: true,
        buttom: false,
        imgInfoShow: false,
        bigImg: null,
        imgIndex: null,
        headerShow: true,
        top: null
    },

    backHome: function (e) {
        let imgInfoShow = !e.detail[0];
        let headerShow = !e.detail[1];
        this.setData({
            imgInfoShow,
            headerShow
        })
    },

    getImgInfo: function (e) {
        
        let top = e.currentTarget.offsetTop - 327;
        window.scrollTo(0,top)
        console.log(top)
        var that = this;
        let index = e.target.dataset.index;
        let value = that.data.hotImg;

        that.setData({
            imgInfoShow: true,
            bigImg: value,
            imgIndex: index,
            headerShow: false,
            top
        })

    },

    changeTabs: function (e) {
        let key = e.detail.activeKey;
        var that = this;
        if (key == "hot") {
            wx.setStorage({
                key: 'type',
                data: "hot",
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
        } else if (key == "love") {
            wx.setStorage({
                key: 'type',
                data: "love",
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
        } else {
            wx.setStorage({
                key: 'type',
                data: "new",
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
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
                                        wx.$util.request({
                                            url: "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?custom=most&per_page=" + page
                                        }).then(result => {
                                            // console.log(result)
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
                                    that.setData({
                                        hotImg,
                                        buttom: true
                                    });
                                })
                                console.log("到底了")
                            }
                        } else if (type == "love") {
                            if (page <= 90) {
                                wx.setStorage({
                                    key: 'page',
                                    data: page,
                                    success: function () {
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