const mysql = require("mysql");
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const MAX_RETRIES = 10;
const RETRY_INTREVAL = 2000;
let retries = 0;

function connect() {
    return new Promise((resolve, reject) => {
        connection.connect((err) => err ? reject(err) : resolve());
    })
}

async function connectAndSchedule() {
    if (retries >= MAX_RETRIES) {
        throw "Unable to connect";
    }

    try {
        await connect();
        console.log("Successfully connected to the Database!");
    } catch (err) {
        retries++;
        console.log("Connection failed: ", err);
        console.log(`Retrying in ${RETRY_INTREVAL / 1000}s. Remaining retries: ${MAX_RETRIES - retries}`)
        setTimeout(connectAndSchedule, RETRY_INTREVAL)
    }
}

connectAndSchedule();

module.exports = connection;