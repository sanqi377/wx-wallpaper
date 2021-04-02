const router = require("express").Router();
const db = require("../config/mysql");
const api = require("../api/index");
const gm = require("../api/Api");

router.post("/gm", async (req,res)=>{
    const data=await gm(req)
        res.status(200).send(data)
})
module.exports = router;
