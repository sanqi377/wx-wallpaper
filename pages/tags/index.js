Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 图片内容
        value: [],
        // 是否在加载中
        loading: true,
        // 内容页数
        page: 5,
        // 标签ID
        tag: null,
        // 标题
        title: null,
        height: null,
        getStatus: true
    },

    // 点击图片事件
    imgInfo: function (e) {
        let index = e.target.dataset.index;
        wx.navigateTo({
            url: '/pages/imgInfo/index?index=' + index,
        })
    },

    showImg: function () {
        var value = this.data.value;
        var height = this.data.height;
        wx.createSelectorQuery().selectAll('.item').boundingClientRect((ret) => {
            ret.forEach((item, index) => {
                if (item.top <= height) {
                    value[index].show = true
                }
            })
            this.setData({
                value
            })
        }).exec()
    },

    // 加载图片数据
    getData: function () {
        var that = this;
        var value = [];
        var page = this.data.page;
        var tag = this.data.tag;
        var title = this.data.title;
        wx.setNavigationBarTitle({
            title: title
        })
        that.setData({
            loading: true
        })
        wx.$util.req({
            data: {
                tags: tag,
                page: page
            },
            method: "POST",
            url: "api/mm"
        }).then((res) => {
            let data = res.data;
            data.forEach(val => {
                let data = {
                    src: val.src,
                    show: false,
                    def: "/public/img/img-default.jpeg"
                };
                value.push(data)
            });
            that.setData({
                value,
                loading: false,
                getStatus: true,
            })
            wx.setStorage({
                key: 'value',
                data: value
            })
            wx.getSystemInfo({ // 获取页面可视区域的高度
                success: (res) => {
                    this.setData({
                        height: res.screenHeight
                    })
                },
            })
            that.showImg();
        })
    },

    onPageScroll: function () { // 滚动事件
        this.showImg()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var tag = options.tag;
        var title = options.title;
        this.setData({
            tag,
            title
        })
        this.getData();
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
        if (getStatus == true) {
            this.setData({
                getStatus: false,
                page: page + 5
            })
            this.getData();
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