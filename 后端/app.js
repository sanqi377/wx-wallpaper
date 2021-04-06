const express = require("express");

const userRouter = require("./router/User");

const apiRouter = require("./router/Api");

const db = require("./config/mysql");

const app = express();

// 将接收到的数据转换为 JSON 格式
app.use(express.json());

// 登录验证中间件
app.use((req, res, next) => {
    let session_key = req.query.session_key;
    if(req.path != '/user/login') {
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
                    msg: "登录状态过期"
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
                    msg: "登录状态过期"
                });
            }
        }
    }
});

app.use("/user", userRouter);

app.use("/api", apiRouter);

app.listen(3000, () => {
    console.log("网站服务器已启动");
});

module.exports = app;