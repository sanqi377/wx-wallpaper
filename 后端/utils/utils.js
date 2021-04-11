const jwt = require("jsonwebtoken");

// jwt 加密
function createToken(data) {
    let secret = "sanqi";
    return jwt.sign({ data }, secret, { expiresIn: "1d" });
}

// jwt 验证
function checkToken(token) {
    let secret = "sanqi";
    try {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, data) => {
                if (err) {
                    resolve({ code: 201, msg: err.message });
                }
                resolve(data);
            });
        });
    } catch (err) {
        throw { code: 201, msg: "Token 验证失败" };
    }
}

module.exports = {
    createToken,
    checkToken,
};
