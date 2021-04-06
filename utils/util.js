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

const req = (options) => {
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
        etcs
    } = options
    return new Promise(function (resolve, reject) {
        wx.getStorage({
            key: 'sessionkey',
            success: function (res) {
                wx.request({
                    // 如果是config之外的服务器地址，则自定义传入
                    url: configs.serverPath + url + '?session_key=' + res.data,
                    method: method,
                    ...etcs,
                    data: data,
                    success(response) {
                        resolve({
                            success: true,
                            statusCode: response.statusCode,
                            ...response.data
                        })
                        console.log('----');
                    },
                    fail(errors) {
                        reject({
                            error: true,
                            success: false,
                            statusCode: errors.statusCode
                        })
                    }
                })
            },
            fail:function(){
                wx.request({
                    // 如果是config之外的服务器地址，则自定义传入
                    url: configs.serverPath + url,
                    method: method,
                    ...etcs,
                    data: data,
                    success(response) {
                        resolve({
                            success: true,
                            statusCode: response.statusCode,
                            ...response.data
                        })
                        console.log('----');
                    },
                    fail(errors) {
                        reject({
                            error: true,
                            success: false,
                            statusCode: errors.statusCode
                        })
                    }
                })
            },
            fail: function () {
                wx.request({
                    // 如果是config之外的服务器地址，则自定义传入
                    url: configs.serverPath + url,
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

function isquire($arr) {
    if (Array.isArray($arr)) {
        var s = new Set($arr);
        if (s.size <= 0) {
            return "数组为空";
        } else {
            var newarr = new Array();
            s.forEach(function (key) {
                newarr.push(key);
            })
            return newarr;
        }
    } else {
        return "不是数组";
    }
}

module.exports = {
    request,
    req,
    isquire
}