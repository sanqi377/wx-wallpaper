const router = require("express").Router();
const db = require("../../config/mysql");
const Token = require("../../utils/utils");
const md5 = require("md5-node");
router
    // 后台登录接口
    .post("/login", (req, res) => {
        let data = req.body;
        db.query(
            "id,username,password",
            "admin",
            `username="${data.username}"`
        ).then((val) => {
            if (!val[0]) {
                res.send({ code: 201, msg: "用户不存在" });
            } else {
                let password = data.password;
                let token = Token.createToken(val[0].id);
                if (md5(password) == val[0].password) {
                    res.send({
                        code: 200,
                        msg: "登录成功",
                        data: { user_id: val[0].id, token: token },
                    });
                } else {
                    res.send({ code: 201, msg: "密码错误" });
                }
            }
        });
    })

    // 获取基本数据
    .post("/info", (req, res) => {
        let data = req.body;
        db.query("nickname,username", "admin", `id=${data.user_id}`).then(
            (val) => {
                var data = {};
                data.nickname = val[0].nickname;
                data.username = val[0].username;
                res.send({
                    code: 200,
                    msg: "获取基本信息成功",
                    data: data,
                });
            }
        );
    })

    // 获取用户列表
    .get("/list", (req, res) => {
        var data = req.query;
        var where = "";
        if (data.nickname) {
            where = `nickname="${data.nickname}"`;
        }
        db.query("*", "user", where).then((val) => {
            db.count("user").then((result) => {
                res.send({
                    code: 0,
                    count: result[0].count,
                    msg: "获取数据成功",
                    data: val.reverse(),
                });
            });
        });
    });
module.exports = router;
