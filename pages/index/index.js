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
        loading: false
    },

    changeTabs: function (e) {
        if (typeof e == "undefined") {
            var that = this;
            var hotImg = [];
            wx.$util.request({
                url: "http://m.bcoderss.com/wp-json/wp/v2/posts?per_page=10&page=1"
            }).then(result => {
                let data = result.data;
                wx.setStorage({
                    key: 'hotImg',
                    data: data,
                    success: function () {
                        wx.getStorage({
                            key: 'hotImg',
                            success: function (res) {
                                let data = res.data;
                                for (let i = 0; i < data.length; i++) {
                                    hotImg.push(data[i].content)
                                }
                                that.setData({
                                    hotImg
                                })
                            }
                        })
                    }
                })
            })
        } else {
            console.log(e.detail.cell)
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
        let hotImg = [];
        let page = 5;
        wx.setStorage({
            key: 'page',
            data: page
        })
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
                let page = res.data + 2;
                if (page <= 90) {
                    wx.setStorage({
                        key: 'page',
                        data: page,
                        success: function () {
                            that.setData({
                                loading: true
                            })
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
                                    loading: false
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
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})