const express = require("express");

const userRouter = require("./router/User");

const classRouter = require("./router/Class");

const md5 = require("md5-node");

const app = express();

// 将接收到的数据转换为 JSON 格式
app.use(express.json());

// 登录验证中间件
app.use((req, res, next) => {
    let session_key = req.body.session_key;
    if (session_key) {
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
});

app.use("/user", userRouter);

app.use("/class", classRouter);

app.listen(3000, () => {
    console.log("网站服务器已启动");
});

module.exports = app;