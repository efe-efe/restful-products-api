const express = require("express");
const router = express.Router();
const controller = require("../../controllers/productController");

router
    .get("/", controller.getProducts)
    .get("/:productId", controller.getProduct)
    .post("/", controller.createProduct)
    .patch("/:productId", controller.updateProduct)
    .delete("/:productId", controller.deleteProduct);

module.exports = router;
