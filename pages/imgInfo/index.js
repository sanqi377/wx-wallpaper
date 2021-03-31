// pages/imgInfo/index.js
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        value: [],
        index: null,
        // 权限提示模态框
        dialogShow: false,
        // 下载成功轻提示
        downloadShow: false,
        // 页面加载轻提示
        loading: true,
        dialog: false,
        tuShow: false,
        posterInfo: {
            width: null,
            height: null
        }
    },

    // 返回上一页
    back: function () {
        wx.navigateBack();
    },

    // 海报分享
    poster: function () {
        let index = this.data.index;
        let value = this.data.value;
        var img = null;
        var that = this;
        value.forEach((val, idx) => {
            if (index == idx) {
                img = val;
            }
        })

        // 获取屏幕宽度
        wx.getSystemInfo({
            success: function (data) {
                var screenWidth = data.windowWidth;
                var screenHeight = data.windowHeight;
                var posterInfo = {
                    'width': screenWidth * 2,
                    'height': screenHeight * 2
                };
                that.setData({
                    posterInfo
                })
                wx.downloadFile({
                    url: img.src,
                    success(res) {
                        if (res.statusCode === 200) {
                            let fileSrc = res.tempFilePath;
                            const ctx = wx.createCanvasContext('myCanvas');
                            // 背景图片
                            ctx.drawImage(fileSrc, 0, 0, (posterInfo.width - posterInfo.width / 6), (posterInfo.height - posterInfo.height / 4));
                            // 底部白色矩形
                            ctx.fillStyle = '#fff';
                            ctx.fillRect(0, (posterInfo.height - posterInfo.height / 4) - (posterInfo.height / 8), (posterInfo.width - posterInfo.width / 6), ((posterInfo.height / 8)))


                            // console.log((posterInfo.height - posterInfo.height / 4) - (posterInfo.height / 8))

                            console.log((posterInfo.height - posterInfo.height / 8) - (posterInfo.height / 10) - ((posterInfo.height * 65 / 30) / 20))

                            console.log((posterInfo.height - posterInfo.height / 8) - (posterInfo.height / 10) - ((posterInfo.height * 35 / 30) / 20))

                            // console.log(((posterInfo.height / 8) / 2))
                            // // 底部文字
                            ctx.setFontSize(30)
                            ctx.setFillStyle('#000000')
                            ctx.fillText('超高清全面屏手机壁纸', 215, (posterInfo.height - posterInfo.height / 8) - (posterInfo.height / 10) - ((posterInfo.height * 65 / 30) / 20))
                            ctx.setFontSize(25)
                            ctx.setFillStyle('#727272')
                            ctx.fillText('长按识别小程序码，看更多精选壁纸', 215, (posterInfo.height - posterInfo.height / 8) - (posterInfo.height / 10) - ((posterInfo.height * 35 / 30) / 20))

                            ctx.draw(false, function () {
                                wx.canvasToTempFilePath({
                                    x: 0,
                                    y: 0,
                                    width: (posterInfo.width - posterInfo.width / 6),
                                    height: (posterInfo.height - posterInfo.height / 4),
                                    destWidth: (posterInfo.width - posterInfo.width / 6),
                                    destHeight: (posterInfo.height - posterInfo.height / 4),
                                    canvasId: 'myCanvas',
                                    success(res) {
                                        wx.saveImageToPhotosAlbum({
                                            filePath: res.tempFilePath,
                                            success() {
                                                setTimeout(() => {
                                                    that.setData({
                                                        tuShow: false
                                                    })
                                                }, 500)
                                            },
                                            fail: function () {
                                                setTimeout(() => {
                                                    that.setData({
                                                        tuShow: false
                                                    })
                                                }, 500)
                                            }
                                        })
                                    }
                                })
                            })

                            that.setData({
                                tuShow: true
                            })
                        }
                    }
                })
            }
        })

    },

    // 点击收藏
    collect: function () {
        let index = this.data.index;
        let value = this.data.value;
        var img = null;
        value.forEach((val, idx) => {
            if (index == idx) {
                img = val;
            }
        })
        console.log(img);
        wx.getStorage({
            key: 'userid',
            success: function (res) {
                let data = {
                    data: {
                        imgurl: img,
                        userid: res.data
                    },
                    method: 'POST',
                    url: 'user/addcollect'
                }
                wx.$util.req(data).then((res) => {
                    console.log(res)
                })
            },
        })
    },

    // 弹出权限获取界面
    openAuth: function () {
        var that = this;
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success: function () {
                            that.downloadImg()
                        }
                    })
                } else {
                    that.downloadImg()
                }
            }
        });
    },

    // 下载图片保存到本地相册
    downloadImg: function () {
        let index = this.data.index;
        let value = this.data.value;
        let imgSrc = null;
        var that = this;
        value.forEach((val, ixd) => {
            if (ixd == index) {
                imgSrc = val.src;
            }
        })
        wx.downloadFile({
            url: imgSrc,
            success(res) {
                if (res.statusCode === 200) {
                    let fileSrc = res.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: fileSrc,
                        success(res) {
                            that.setData({
                                downloadShow: true
                            })
                        }
                    })
                }
            }
        })
    },

    // 提示授权
    download: function () {
        var that = this;
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    that.setData({
                        dialogShow: true
                    })
                } else {
                    that.downloadImg()
                }
            }
        });
    },

    //滑动图片事件
    slideImg: function (e) {
        this.setData({
            index: e.detail.current
        })
        this.addHistory(e.detail.current);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        let index = options.index;
        if (options.coll) {
            wx.getStorage({
                key: 'coll',
                success: (res => {
                    that.setData({
                        index: index,
                        value: res.data
                    })
                })
            })
        } else {
            wx.getStorage({
                key: 'value',
                success: function (res) {
                    that.setData({
                        index: index,
                        value: res.data,
                        loading: false
                    })
                },
                fail: function () {
                    wx.getStorage({
                        key: 'collect',
                        success: function (res) {
                            that.setData({
                                index: index,
                                value: res.data
                            })
                        }
                    })
                },
            })
        }
        /*
         * 添加到用户历史界面
         */
        this.addHistory(index);
    },

    // 添加到历史方法
    addHistory(index) {
        const that = this;
        wx.getStorage({
            key: 'collect',
            success: (result) => {
                app.collect.data = result.data;
                wx.getStorage({
                    key: 'value',
                    success: (result) => {
                        that.addHis(index, result);
                    }
                })
            },
            fail: function () {
                wx.getStorage({
                    key: 'value',
                    success: (result) => {
                        that.addHis(index, result);
                    }
                })
            }
        })
    },
    // 添加用户浏览历史方法
    addHis(index, result) {
        let index1 = app.collect.data.findIndex(item => {
            return item.src === result.data[index].src;
        })
        if (index1 < 0) {
            app.collect.data.unshift(result.data[index]);
            wx.setStorage({
                data: app.collect.data,
                key: 'collect',
            })
        } else {
            app.collect.data.splice(index1, 1);
            app.collect.data.unshift(result.data[index]);
            wx.setStorage({
                data: app.collect.data,
                key: 'collect',
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

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