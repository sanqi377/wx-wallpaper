// pages/classify/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 排行榜数据
        rank: [{
                key: "download",
                name: "下载榜",
                class: "download",
                ename: "Top download"
            },
            {
                key: "new",
                name: "新品榜",
                class: "new",
                ename: "New ranking"
            },
            {
                key: "collect",
                name: "收藏榜",
                class: "collect",
                ename: "Collection ranking"
            },
            {
                key: "hot",
                name: "热度榜",
                class: "hot",
                ename: "Top ranking"
            }
        ],
        // 标签数据
        tags: [],
        // 分类数据
        cats: []
    },

    // 分类点击事件
    catInfo: function(e) {
        let catId = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '/pages/catsInfo/index?catid=' + catId,
        })
    },

    // 榜单点击事件
    routerRank: function (e) {
        let rankType = e.currentTarget.dataset.key;
        wx.navigateTo({
            url: '/pages/ranking/index?type=' + rankType,
        })
    },

    // 标签点击事件
    imgInfo: function (e) {
        var tag = e.target.dataset.id;
        var data = this.data.tags;
        var title = null;
        data.forEach(val => {
            if (val.id == tag) {
                title = val.name;
            }
        });
        wx.navigateTo({
            url: '/pages/tags/index?title=' + title + '&tag=' + tag,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;

        // 获取标签数据
        wx.$util.request({
            url: "https://wallpaper.zuimeix.com/wp-json/wp/v2/tags?orderby=id&order=asc&hide_empty=true&per_page=10"
        }).then(result => {
            let tags = [];
            let data = result.data;
            for (let i = 0; i < data.length; i++) {
                let array = {
                    id: data[i].id,
                    name: data[i].name
                };
                tags.push(array)
            }
            that.setData({
                tags
            })
        })

        // 获取分类数据
        wx.$util.request({
            url: "https://wallpaper.zuimeix.com/wp-json/wp/v2/categories?orderby=id&order=asc&per_page=50&hide_empty=true"
        }).then(result => {
            let cats = [];
            let data = result.data;
            for (let i = 0; i < data.length; i++) {
                if (data[i].cover) {
                    let array = {
                        id: data[i].id,
                        name: data[i].name,
                        cover: data[i].cover
                    };
                    cats.push(array)
                }
            }
            that.setData({
                cats
            })
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