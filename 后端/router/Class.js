const router = require("express").Router();
const db = require("../config/mysql");

router.post("/list", (req, res) => {
    db.query("*", "wx_class", "", (val) => {
        res.send({
            code: 200,
            msg: "查询成功",
            data: val,
        });
    });
});

module.exports = router;
