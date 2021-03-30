const router = require("express").Router();
const db = require("../config/mysql");
const md5 = require("md5-node");
const request = require("request");
router
  // 示例规范
  // .post("/login", (req, res) => {
  //     let data = req.body;
  //     db.query("*", "wx_users", "", (val) => {
  //         if (data.user != val[0].username) {
  //             res.send({ code: 201, msg: "用户不存在" });
  //             return;
  //         }
  //         if (data.pass != val[0].password) {
  //             res.send({ code: 201, msg: "密码错误" });
  //             return;
  //         }
  //         let token = md5("sanqi" + val[0].id);
  //         res.setHeader("user_id", val[0].id);
  //         res.setHeader("token", token);
  //         res.send({
  //             code: 200,
  //             msg: "登陆成功",
  //             data: { user_id: val[0].id, token: token },
  //         });
  //     });
  // })
  // 登录接口
  .post("/login", (req, res) => {
    const code = req.body.code;
    const AppId = "wxa36eef4162bac240";
    const AppSecret = "2e02b895c9e235d78fbd677c3de9feb9";
    if (!code) {
      res.status(200).send({ code: 0, message: "code is null" });
    }
    let loginUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${AppId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`;
    request(loginUrl, (err, res1, body) => {
      body = JSON.parse(body);
      let openid = body.openid;
      let sessionKey=body.session_key;
      sessionKey=md5(sessionKey);
      openid = md5(openid);
      db.select("*", "user", "openid",openid, (val) => {
        if (!val[0]) {
          db.insert("openid,session_key",`${openid}','${sessionKey}`, "user", (val1) => {
            res.status(200).send({ id: val1.insertId,sessionKey, message: "登录成功" });
          });
        } else {
          db.update(`openid='${openid}'`,`session_key='${sessionKey}'`,'user',(val2)=>{
            res.status(200).send({ id: val[0].id,sessionKey, message: "登录成功" });
          });
        }
      });
    });
  })
  // 添加到收藏
  .post("/collect",(req,res)=>{
    
  })

module.exports = router;
