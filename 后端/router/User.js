const router = require("express").Router();
const db = require("../config/mysql");
const md5 = require("md5-node");

router
    // 登录接口
    .post("/login", (req, res) => {
        let data = req.body;
        db.query("*", "wx_users", "", (val) => {
            if (data.user != val[0].username) {
                res.send({ code: 201, msg: "用户不存在" });
                return;
            }
            if (data.pass != val[0].password) {
                res.send({ code: 201, msg: "密码错误" });
                return;
            }
            let token = md5("sanqi" + val[0].id);
            res.setHeader("user_id", val[0].id);
            res.setHeader("token", token);
            res.send({
                code: 200,
                msg: "登陆成功",
                data: { user_id: val[0].id, token: token },
            });
        });
    })

module.exports = router;
