// pages/my/addposts.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addImg: [],
        loading: false
    },

    // 添加图片
    onChangeTap: function (e) {
        let addImg = e.detail.all;
        var filePath = addImg[0];
        this.setData({
            loading: true
        })
        var that = this;
        wx.uploadFile({
            url: 'https://img.rruu.net/api/upload',
            filePath: filePath,
            name: 'image',
            formData: {
                'token': 'c0053e82b72193d7f2b8b78ecadfdd9e',
                'apiType': 'ali',
            },
            success: res => {
                let data = JSON.parse(res.data);
                data = data.data.url.ali
                that.setData({
                    loading: false
                })
                console.log(data);
            }
        });
    },

    // 上传图片
    submit: function () {
        let addImg = this.data.addImg;
        wx.$util.req({
            data: {
                img: addImg
            },
            method: 'POST',
            url: 'user/addposts'
        }).then(res => {
            console.log(res)
        })
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