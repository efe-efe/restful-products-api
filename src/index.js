const express = require("express");
const mysql = require("mysql");
const routerAvailableVersions = ["v1"];

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if (err) {
        throw err;
    }

    console.log("Successful database connection!");
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
for (const version of routerAvailableVersions) {
    const router = require(`./routes/${version}`);
    app.use(`/api/${version}`, router);
}

app.listen(PORT, () => {
    console.log(`Server running and listening on port ${PORT}`);
});
