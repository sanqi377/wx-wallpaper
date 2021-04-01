const router = require("express").Router();
const db = require("../config/mysql");
const api = require("../api/index");

router.post("/", (req, res) => {
    let data = req.body;
    console.log(api)
    api.mm(data.type, data.page);
});

module.exports = router;
