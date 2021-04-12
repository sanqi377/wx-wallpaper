const router = require("express").Router();
const request = require("request");
const db = require("../../config/mysql");

router
    // 获取壁纸
    .get("/list", (req, res) => {
        var data = req.query;
        var where = "";
        if (data.type) {
            where = `type=${data.type}`;
        }
        db.query(
            "*",
            "wallpaper",
            `type=${data.type}`,
            `${data.page}`,
            `${data.limit}`
        ).then((val) => {
            db.count("wallpaper").then((result) => {
                res.send({
                    code: 0,
                    count: result[0].count,
                    msg: "获取壁纸列表成功",
                    data: val,
                });
            });
        });
    })

    // 壁紙採集
    .get("/caiji", (req, res) => {
        var data = req.query;
        caiji(data).then((result) => {
            result.forEach((val) => {
                let addtime = Date.parse(new Date()) / 1000;
                db.insert(
                    "title,cat,src,addtime,status,type,source",
                    `"${val.title}","${data.release_cat}","${val.src}",${addtime},1,1,"${data.caiji_yuan}"`,
                    "wallpaper"
                );
            });
            res.send({ code: 200, msg: "正在采集", data: result });
        });
    });

// 壁紙采集
function caiji(data) {
    return new Promise((resolve, reject) => {
        var value = [];
        var url = "";
        switch (data.caiji_yuan) {
            case "xiaoquan":
                url = `https://diy.youxie.ren/wp-json/mp/v2/posts?per_page=100&categories=40&page=1`;
                data.caiji_yuan = "小圈壁纸";
                data.release_cat = "游戏";
                break;

            default:
                break;
        }
        request(
            {
                url: url,
                method: "GET",
            },
            function (err, res, body) {
                if (err) {
                    reject("采集失败");
                    return;
                }
                var data = JSON.parse(body);
                data.forEach((val1) => {
                    val1.wallpaper.forEach((val2) => {
                        let data = {
                            title: val1.title.rendered,
                            src: val2.full,
                        };
                        value.push(data);
                    });
                });
                resolve(value);
            }
        );
    });
}

module.exports = router;
