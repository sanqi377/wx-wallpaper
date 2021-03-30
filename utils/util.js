import configs from '../config/cofig.js'

const request = (params) => {
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}
const req=(options)=>{
      /**
     * @param {object} data 传参
     * @param {string} method 请求方法
     * @param {string} url
     * @param {object} etcs request函数的其他属性，我暂时没用到
     */
    const {
        data,
        method,
        url,
        server,
        etcs
    } = options
    return new Promise(function (resolve, reject) {
        wx.getStorage({
            key: 'sessionkey',
            success: function (res) {
                wx.request({
                    // 如果是config之外的服务器地址，则自定义传入
                    url:configs.serverPath + url+'?session_key='+res.data,
                    method: method,
                    ...etcs,
                    data: data,
                    success(response) {
                        resolve({
                            success: true,
                            statusCode: response.statusCode,
                            ...response.data
                        })
                    },
                    fail(errors) {
                        reject({
                            error: true,
                            success: false,
                            statusCode: errors.statusCode
                        })
                    }
                })
            }
        })
    })
}
module.exports = {
    request,
    req
}