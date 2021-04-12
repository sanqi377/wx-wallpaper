// url 截取获取 path
function GetUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

// 验证 token
const user_id = window.localStorage.getItem("user_id");
const token = window.localStorage.getItem("access_token");

function checkLogin() {
    var path = GetUrlRelativePath();
    if (!token) {
        if (path != "/login.html") {
            window.location.href = "../login.html";
            return;
        }
    } else {
        if (path == "/login.html") {
            window.location.href = "../index.html";
            return;
        }
    }
}

window.onload = checkLogin();

var HttpRequest = function (options) {
    var defaults = {
        type: "get",
        headers: {},
        data: {},
        dataType: "json",
        async: true,
        cache: false,
        beforeSend: null,
        success: null,
        complete: null,
    };
    var o = $.extend({}, defaults, options);
    o.data.token = token;
    $.ajax({
        url: o.url,
        type: o.type,
        headers: {
            "Content-Type": o.contentType,
        },
        data: o.data,
        dataType: o.dataType,
        async: o.async,
        beforeSend: function () {
            o.beforeSend && o.beforeSend();
        },
        success: function (res) {
            if (res.code === 201) {
                window.localStorage.removeItem("access_token");
            }
            o.success && o.success(res);
        },
        complete: function (res) {
            o.complete && o.complete();
        },
    });
};

var loginHttp = function (options) {
    // 后台如果要求 Content-Type
    if (options.type == "post") {
        options.contentType = "application/x-www-form-urlencoded";
    }
    HttpRequest(options);
};
var ajaxHttp = function (options) {
    if (options.type == "post") {
        options.contentType = "application/x-www-form-urlencoded";
    }
    // 每次请求携带token
    HttpRequest(options);
};
