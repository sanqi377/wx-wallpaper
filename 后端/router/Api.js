const router = require("express").Router();
const gm = require("../api/Gm");
const api = require("../api/mm");

router
    // 大师
    .post("/gm", async (req, res) => {
        const data = await gm(req)
        res.status(200).send({ data: data })
        // 今日壁纸
    })
    .post("/mm/today", (req, res) => {
        let data = req.body;
        api.today((data) => {
            res.send({ data: data });
        });
    });

router
    // 猫萌壁纸api
    .post("/mm", (req, res) => {
        let data = req.body;
        api.mm(data, (data) => {
            res.send({ data: data });
        });
    })

    // 今日壁纸
    .post("/mm/today", (req, res) => {
        let data = req.body;
        api.today((data) => {
            res.send({ data: data });
        });
    });

module.exports = router;
