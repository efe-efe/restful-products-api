const service = require("../services/productService");

function getProducts(req, res) {
    service.getProducts();
    res.send("Get all products");
}

function getProduct(req, res) {
    service.getProduct(req.params.productId);
    res.send(`Get product: ${req.params.productId}`);
}

function postProduct(req, res) {
    //TODO: Validate body and create product and use it as parameter for service.postProduct

    service.postProduct({});
    res.send(`Create product: ${req.params.productId}`);
}

function patchProduct(req, res) {
    const { body } = req;

    if (!body.productId) {
        return;
    }

    service.patchProduct(body.productId);
    res.send(`Update product: ${body.productId}`);
}

function deleteProduct(req, res) {
    const { body } = req;

    if (!body.productId) {
        return;
    }

    service.deleteProduct(body.productId);
    res.send(`Delete product: ${req.params.productId}`);
}

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    patchProduct,
    deleteProduct
}