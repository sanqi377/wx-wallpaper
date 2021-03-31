const router = require("express").Router();
const db = require("../config/mysql");
const md5 = require("md5-node");
const request = require("request");
const axios = require("axios");
const FormData = require("form-data");
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
    const { imgurl, userid } = req.body;
    db.query(
      "*",
      "collect",
      `image_url='${imgurl}' and user_id='${userid}'`,
      (val1) => {
        if (!val1[0]) {
          db.insert(
            "image_url,user_id",
            `${imgurl.src}','${userid}`,
            "collect",
            (val2) => {
              res
                .status(200)
                .send({ id: val2.insertId, message: "收藏成功", code: 1 });
            }
          );
        } else {
          res.status(200).send({ message: "该用户已收藏当前图片", code: 0 });
        }
      }
    );
  })
  // 获取用户收藏
  .post("/getcollect", (req, res) => {
    const user_id = req.body.userid;
    db.query("*", "collect", `user_id='${user_id}'`, (val) => {
      let arr = [];
      val.forEach((item) => {
        arr.push({src:item.image_url});
      });
      res.status(200).send({ data: arr });
    });
  })
  // 用户取消收藏
  .post("/delcollect", (req, res) => {
    const { userid, imgurl } = req.body;
    db.delete(
      `user_id='${userid}' and image_url='${imgurl}'`,
      "collect",
      (val) => {
        if (val.affectedRows > 0) {
          res.status(200).send({ message: "取消成功", code: 1 });
        } else {
          res.status(200).send({ message: "取消失败", code: 0 });
        }
      }
    );
  })
  // 用户签到
  .post("/sign", (req, res) => {
    const { userid } = req.body;
    db.query("*", "sign", `user_id=${userid}`, (val) => {
      // 判断是否是同一天
      const time = new Date().getTime();
      if (val[0]) {
        const a =
          new Date(val[0].last_time).toDateString() ===
          new Date().toDateString();
        if (!a) {
          db.update(
            `user_id='${userid}'`,
            `count='${val[0].count + 1}',
            last_time='${time}'`,
            "sign",
            (val1) => {
              db.insert(
                "user_id,sign_time",
                `${userid}','${time}`,
                "sign_log",
                (val2) => {
                  res
                    .status(200)
                    .send({ message: "签到成功", count: val[0].count + 1 });
                }
              );
            }
          );
        } else {
          res
            .status(200)
            .send({ message: "已经签到过了", count: val[0].count });
        }
      } else {
        db.insert(
          "user_id,sign_time",
          `${userid}','${time}`,
          "sign_log",
          (val1) => {
            db.insert(
              "user_id,count,last_time",
              `${userid}','1','${time}`,
              "sign",
              (val2) => {
                res
                  .status(200)
                  .send({ message: "签到成功", count:1 });
              }
            );
          }
        );
      }
    });
  })
  // 获取签到天数
  .post("/getsign",(req,res)=>{
    const user_id=req.body.userid;
    db.query('*',"sign",`user_id='${user_id}'`,(val)=>{
      if(val[0]){

        res.status(200).send({count:val[0].count});
      }else{
        res.status(200).send({count:0});
      }
    })
  })
module.exports = router;
