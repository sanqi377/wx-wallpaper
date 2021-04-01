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
        page: 25,
        // 标签ID
        search: null,
        // 标题
        title: null,
        height: null
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
        var search = this.data.search;
        var title = this.data.title;
        wx.setNavigationBarTitle({
            title: title
        })
        wx.$util.request({
            url: "https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?per_page="+page+"&access_token=ZDAwYzE2ZjIwNmI2NDMyOGQ1YTcyNjQyOThmMGU3NzYxY2E2N2VmYTQ2NTE5YmM4OTQ0ZjJiMmM5MWVjNTI2ZA&search="+search+"&page=1"
        }).then(result => {
            console.log(result)
            let data = result.data;
            data.forEach(val => {
                (val.wallpaper).forEach(val1 => {
                    let data = {
                        src: val1.full,
                        show: false,
                        def: "/public/img/img-default.jpeg"
                    };
                    value.push(data)
                })
            });
            that.setData({
                value,
                loading: false
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
        var search = options.search;
        var title = options.search;
        this.setData({
            search,
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
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})