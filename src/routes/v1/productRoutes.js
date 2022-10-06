const express = require("express");
const router = express.Router();
const controller = require("../../controllers/productController");

router
    .get("/", controller.getProducts)
    .get("/:productId", controller.getProduct)
    .post("/:productId", controller.postProduct)
    .patch("/:productId", controller.patchProduct)
    .delete("/:productId", controller.deleteProduct);

module.exports = router;
