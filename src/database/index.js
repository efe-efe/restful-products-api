const mysql = require("mysql");
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//TODO: Remove race condition
connection.connect((err) => {
    if (err) {
        throw err;
    }

    console.log("Successful database connection!");
});

module.exports = connection;