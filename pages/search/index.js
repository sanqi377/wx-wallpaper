// pages/search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collectImg:[],
        loading:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    getImgInfo:function(e){
        let index = e.target.dataset.index;
        let value=this.data.collectImg;
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
    onLoad: function (options) {
        const search=options.search;
        wx.setNavigationBarTitle({
            title:search
        })
        const url=`https://wallpaper.zuimeix.com/wp-json/mp/v2/posts?per_page=15&access_token=ZDAwYzE2ZjIwNmI2NDMyOGQ1YTcyNjQyOThmMGU3NzYxY2E2N2VmYTQ2NTE5YmM4OTQ0ZjJiMmM5MWVjNTI2ZA&search=${search}&page=1`
        let collectImg=[]
        wx.$util.request({url}).then(res=>{
            res.data.forEach(item=>{
                item.wallpaper.forEach(item1=>{
                    collectImg.push({src:item1.thumb})
                })
            })
            this.setData({
                collectImg,
                loading:false
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