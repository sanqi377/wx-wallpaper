const express = require("express");
const db = require("./config/mysql");
const Token = require("./utils/utils");
const bodyParser = require("body-parser");
const app = express();

// 前端 router 引入
const userRouter = require("./router/User");
const apiRouter = require("./router/Api");

// 后端 router 引入
const adminUser = require("./router/admin/User");
const adminWallpaper = require("./router/admin/Wallpaper");

// 将接收到的数据转换为 JSON 格式
app.use(express.json());

app.use("/admin", bodyParser.urlencoded({ extended: true }));

// 登录验证中间件
app.use((req, res, next) => {
    let session_key = req.query.session_key;
    if (req.path != "/user/login") {
        next();
        return;
    }
    if (session_key) {
        db.select("*", "user", "session_key", session_key, (val) => {
            if (val[0]) {
                next();
            } else {
                res.send({
                    code: 400,
                    msg: "登录状态过期",
                });
            }
        });
    } else {
        if (req.path == "/user/login") {
            next();
        } else {
            if (req.path == "/user/login") {
                next();
            } else {
                res.send({
                    code: 400,
                    msg: "登录状态过期",
                });
            }
        }
    }
});

// 前端 router 使用
app.use("/user", userRouter);
app.use("/api", apiRouter);

// 后端 token 验证
app.use("/admin", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.path == "/user/login") {
        next();
        return;
    }
    let data = null;
    if (req.method == "POST") {
        data = req.body;
    } else if (req.method == "GET") {
        data = req.query;
    }
    let token = data.token;
    if (token != "null") {
        Token.checkToken(token).then((result) => {
            if (result.code == 201) {
                res.send({ code: 201, msg: "登录超时，请重新登录" });
            } else {
                next();
            }
        });
    } else {
        res.send({ code: 201, msg: "登录超时，请重新登录" });
    }
});

// 后端 router 使用
app.use("/admin/user", adminUser);
app.use("/admin/wallpaper", adminWallpaper);

app.listen(3000, () => {
    console.log("网站服务器已启动");
});

module.exports = app;