const service = require("../services/productService");
const { serverError, badRequest } = require("./errors");

async function getProducts(req, res) {
    try {
        const products = await service.getProducts();
        res.send(products);
    }
    catch {
        res.status(serverError.code).send({
            status: serverError.status,
            data: serverError.data,
        });
    }
}

async function getProduct(req, res) {
    const { params: { productId } } = req;

    //TODO: Validate params

    try {
        const product = await service.getProduct(productId);
        res.send(product);
    }
    catch {
        res.status(serverError.code).send({
            status: serverError.status,
            data: serverError.data,
        });
    }
}

async function createProduct(req, res) {
    const { body } = req;

    //TODO: Validate body

    const product = {
        sku: body.sku,
        name: body.name,
        brand: body.brand,
        size: body.size,
        price: body.price,
        image: body.image
    }

    try {
        await service.createProduct(product);
        res.status(200).send({
            status: "success",
            data: { message: "Successfully inserted product." },
        });
    }
    catch {
        res.status(serverError.code).send({
            status: serverError.status,
            data: serverError.data,
        });
    }
}

async function updateProduct(req, res) {
    const { body, params: { productId } } = req;

    //TODO: Validate params & body

    const product = {
        sku: productId,
        name: body.name,
        brand: body.brand,
        size: body.size,
        price: body.price,
        image: body.image
    }

    try {
        await service.updateProduct(product);
        res.status(200).send({
            status: "success",
            data: { message: "Successfully updated product." },
        });
    }
    catch {
        res.status(serverError.code).send({
            status: serverError.status,
            data: serverError.data,
        });
    }
}

async function deleteProduct(req, res) {
    const { params: { productId } } = req;

    //TODO: Validate params

    try {
        await service.deleteProduct(productId);
        res.status(200).send({
            status: "success",
            data: { message: "Successfully deleted product." },
        });
    }
    catch {
        res.status(serverError.code).send({
            status: serverError.status,
            data: serverError.data,
        });
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}