const mysql = require("mysql");

// mysql 配置
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "wxx",
});

connection.connect();

module.exports = {
    // 封装 mysql 查询
    query: (field, table, where, callback) => {
        if (where) {
            var sql = `select ${field} from ${table} where ${where} order by id desc`;
        } else {
            var sql = `select ${field} from ${table} order by id desc`;
        }
        console.log(sql);
        connection.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            callback(res);
        });
    },
    // 按条件查询
    select: (field, table, where,value, callback) => {
        var sql = `select ${field} from ${table} where ${where}='${value}' order by id desc`;
        connection.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            callback(res);
        });
    },

    // 封装 mysql 插入
    insert: (field, data, table, callback) => {
        var sql = `insert into ${table} (${field}) values ('${data}')`;
        connection.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            callback(res);
        });
    },
    // 封装 mysql 更新
    update: (where, data, table, callback) => {
        var sql = `update ${table} set ${data} where ${where}`;
        connection.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            callback(res);
        });
    },
};