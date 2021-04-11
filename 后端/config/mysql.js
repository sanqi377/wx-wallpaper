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
    query: (field, table, where, page, limit) => {
        return new Promise((resolve, reject) => {
            var term = "order by id desc";
            if (where) {
                term = `where ${where} ` + term;
            }
            if (page && limit) {
                if (page == 1) {
                    page = 0;
                }
                if (page > 1) {
                    page = (page - 1) * limit;
                }
                term = term + ` limit ${page},${limit}`;
            }
            var sql = `select ${field} from ${table} ${term}`;
            connection.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    },
    // 按条件查询
    select: (field, table, where, value, callback) => {
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
    insert: (field, data, table) => {
        return new Promise((resolve, reject) => {
            var sql = `insert into ${table} (${field}) values (${data})`;
            connection.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
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
    // 封装 mysql 删除
    delete: (where, table, callback) => {
        var sql = `delete from ${table} where ${where}`;
        connection.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            callback(res);
        });
    },
    // 封装 mysql 数量返回
    count: (table) => {
        return new Promise((resolve, reject) => {
            var sql = `select count(id) as count from ${table}`;
            connection.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    },
};
