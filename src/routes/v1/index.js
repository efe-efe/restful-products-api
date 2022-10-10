const express = require("express");
const productsRoutes = require('./productRoutes');
const router = express.Router();

router.use("/products", productsRoutes);

module.exports = router;