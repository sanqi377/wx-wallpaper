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
            sessionKey = md5(sessionKey);
            openid = md5(openid);
            db.select("*", "user", "openid", openid, (val) => {
                if (!val[0]) {
                    db.insert(
                        "openid,session_key",
                        `${openid}','${sessionKey}`,
                        "user",
                        (val1) => {
                            res
                                .status(200)
                                .send({
                                    id: val1.insertId,
                                    sessionKey,
                                    message: "登录成功"
                                });
                        }
                    );
                } else {
                    db.update(
                        `openid='${openid}'`,
                        `session_key='${sessionKey}'`,
                        "user",
                        (val2) => {
                            res
                                .status(200)
                                .send({
                                    id: val[0].id,
                                    sessionKey,
                                    message: "登录成功"
                                });
                        }
                    );
                }
            });
        });
    })

    // 添加到收藏
    .post("/addcollect", (req, res) => {
        const {
            imgurl,
            userid
        } = req.body;
        db.query("*", "collect", `image_url='${imgurl}' and user_id='${userid}'`, (val1) => {
            if (!val1[0]) {
                db.insert('image_url,user_id', (`${imgurl}','${userid}`), 'collect', (val2) => {
                    res.status(200).send({
                        id: val2.insertId,
                        message: "收藏成功"
                    });
                })
            } else {
                res.status(200).send({
                    message: "该用户已收藏当前图片"
                });
            }
        })

    })
    .post("/getcollect", (req, res) => {
        const user_id = req.body.userid;
        db.query("*", "collect", `user_id='${user_id}'`, (val) => {
            res.status(200).send(val);
        })
    })

module.exports = router;