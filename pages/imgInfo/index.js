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
        dialog:false
    },
    // 返回上一页
    back: function () {
        wx.navigateBack();
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
        if(options.coll){
            wx.getStorage({
              key: 'coll',
              success:(res=>{
                that.setData({
                    index: index,
                    value: res.data
                })
              })
            })
        }else{
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