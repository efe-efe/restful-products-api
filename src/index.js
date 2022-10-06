const express = require("express");
const routerAvailableVersions = ["v1"];

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
