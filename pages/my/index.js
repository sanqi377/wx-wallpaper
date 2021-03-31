// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    signday: 0,
    sign:true
  },


  clickTask: function () {
    wx.navigateTo({
      url: '../task/index',
    })
  },
  clickSign: function () {
    const that = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.$util.req({
          url: 'user/sign',
          method: "POST",
          data: {
            userid: res.data
          }
        }).then(res => {
          that.setData({
            signday: res.count,
          })
          that.setData({
            sign: true,
          })
          wx.showToast({
            title: res.message,
          })
        })
      }
    })
  },
  clickCollect: function () {
    wx.navigateTo({
      url: '../collect/index',
    })
  },
  clickHistory: function () {
    wx.navigateTo({
      url: '../history/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userinfo',
      success: (res => {
        this.setData({
          city: res.data.province + ' ' + res.data.city
        })
      })
    })
    wx.getStorage({
      key: 'userid',
      success: (res => {
        wx.$util.req({
          url: "user/getsign",
          method: "POST",
          data: {
            userid: res.data
          }
        }).then(res => {
          this.setData({
            signday: res.count
          })
        })
      })
    })
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