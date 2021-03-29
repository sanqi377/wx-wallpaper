const router = require("express").Router();
const db = require("../config/mysql");
const md5 = require("md5-node");
const request = require("request");
router
    // 登录接口
    .post("/login", (req, res) => {
        const code = req.body.code;
        const AppId = "wxe9cf93cfd4b2619f";
        const AppSecret = "f678f2442d0fea6a994a50e914374ad3";
        if (!code) {
            res.status(200).send({
                code: 0,
                message: "code is null"
            });
        }
        let loginUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${AppId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`;
        request(loginUrl, (err, res1, body) => {
            body = JSON.parse(body);
            let openid = body.openid;
            let sessionKey = body.session_key;
            openid = md5(openid);
            db.select("*", "user", "openid", openid, (val) => {
                if (!val[0]) {
                    db.insert("openid", openid, "user", (val1) => {
                        res.status(200).send({
                            id: val1.insertId,
                            sessionKey,
                            message: "登录成功"
                        });
                    });
                } else {
                    res.status(200).send({
                        id: val[0].id,
                        sessionKey,
                        message: "登录成功"
                    });
                }
            });
        });
    })

    // 添加到收藏
    .post("/collect", (req, res) => {
        res.send("dasdasd");
    })

module.exports = router;