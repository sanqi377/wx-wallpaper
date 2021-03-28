// pages/imgInfo/index.js
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
        loading: true
    },

    // 返回上一页
    back: function () {
        wx.navigateBack();
    },

    // 弹出权限获取界面
    openAuth: function () {
        var that = this;
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    console.log("没授权")
                    wx.openSetting({
                        success(res) {
                            let status = res.authSetting['scope.writePhotosAlbum'];
                            if (status == true) {
                                that.downloadImg()
                            }
                        }
                    })
                } else {
                    console.log("授权了")
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
                imgSrc = val;
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
                            console.log(res)
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
                    console.log("没授权")
                    that.setData({
                        dialogShow: true
                    })
                    // wx.openSetting({
                    //     success(res) {
                    //         let status = res.authSetting['scope.writePhotosAlbum'];
                    //         if (status == true) {
                    //             that.downloadImg()
                    //         }
                    //     }
                    // })
                } else {
                    console.log("授权了")
                    that.downloadImg()
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getStorage({
            key: 'value'?'value':'collect',
            success: function (res) {
                wx.getStorage({
                    key: 'index',
                    success: function (result) {
                        that.setData({
                            index: result.data,
                            value: res.data,
                            loading: false
                        })
                    }
                })
            },
            fail:function(){
                wx.getStorage({
                    key: 'collect',
                    success: function (res) {
                        wx.getStorage({
                            key: 'index',
                            success: function (result) {
                                that.setData({
                                    index: result.data,
                                    value: res.data
                                })
                            }
                        })
                    }
                })
            }
        })
        
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