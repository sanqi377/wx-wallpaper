const router = require("express").Router();
const db = require("../../config/mysql");

router.get("/list", (req, res) => {
    db.query("*", "cate").then((val) => {
        res.send({ code: 0, count: 3, data: val });
    });
});

module.exports = router;
