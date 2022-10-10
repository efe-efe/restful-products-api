const Joi = require("Joi");
const service = require("../services/productService");
const { serverError, badRequest } = require("./errors");

//TODO: Add limits and pagination
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
    const { params } = req;

    const schema = Joi.object({
        productId: Joi.string()
            .required()
            .min(11)
            .max(13)
            .regex(new RegExp("^FAL-\\d{7,9}$"))
    });

    const errors = schema.validate(params).error;
    if (errors) {
        res.status(badRequest.code).send({
            status: badRequest.status,
            data: { error: errors.message }
        });
        return;
    }

    try {
        const product = await service.getProduct(params.productId);
        res.send(product);
    }
    catch (err) {
        console.log(err);
        res.status(serverError.code).send({
            status: serverError.status,
            data: serverError.data,
        });
    }
}

async function createProduct(req, res) {
    const { body } = req;

    const schema = Joi.object({
        sku: Joi.string()
            .required()
            .min(11)
            .max(13)
            .regex(new RegExp("^FAL-\\d{7,9}$")),
        name: Joi.string()
            .required()
            .min(3)
            .max(50),
        brand: Joi.string()
            .required()
            .min(3)
            .max(50),
        size: Joi.string(),
        price: Joi.number()
            .required()
            .min(1)
            .max(99999999),
        images: Joi.array().items(Joi.string())
    });

    const errors = schema.validate(body).error;
    if (errors) {
        res.status(badRequest.code).send({
            status: badRequest.status,
            data: { error: errors.message }
        });
        return;
    }

    const product = {
        sku: body.sku,
        name: body.name,
        brand: body.brand,
        size: body.size,
        price: body.price,
        images: body.images ?? []
    }

    try {
        await service.createProduct(product);
        res.status(200).send({
            status: "success",
            data: { message: "Successfully inserted product." },
        });
    }
    catch (err) {
        console.log(err);
        res.status(serverError.code).send({
            status: serverError.status,
            data: serverError.data,
        });
    }
}

async function updateProduct(req, res) {
    const { body, params } = req;

    const paramsSchema = Joi.object({
        productId: Joi.string()
            .required()
            .min(11)
            .max(13)
            .regex(new RegExp("^FAL-\\d{7,9}$"))
    });

    const bodySchema = Joi.object({
        name: Joi.string()
            .required()
            .min(3)
            .max(50),
        brand: Joi.string()
            .required()
            .min(3)
            .max(50),
        size: Joi.string(),
        price: Joi.number()
            .required()
            .min(1)
            .max(99999999),
        images: Joi.array().items(Joi.string())
    });

    const errors = paramsSchema.validate(params).error ?? bodySchema.validate(body).error;
    if (errors) {
        console.log(errors);
        res.status(badRequest.code).send({
            status: badRequest.status,
            data: { error: errors.message }
        });
        return;
    }

    const product = {
        sku: params.productId,
        name: body.name,
        brand: body.brand,
        size: body.size,
        price: body.price,
        images: body.images ?? []
    }

    try {
        await service.updateProduct(product);
        res.status(200).send({
            status: "success",
            data: { message: "Successfully updated product." },
        });
    }
    catch (err) {
        console.log(err);
        res.status(serverError.code).send({
            status: serverError.status,
            data: serverError.data,
        });
    }
}

async function deleteProduct(req, res) {
    const { params } = req;

    const schema = Joi.object({
        productId: Joi.string()
            .required()
            .min(11)
            .max(13)
            .regex(new RegExp("^FAL-\\d{7,9}$"))
    });

    const errors = schema.validate(params).error;
    if (errors) {
        res.status(badRequest.code).send({
            status: badRequest.status,
            data: { error: errors.message }
        });
        return;
    }

    try {
        await service.deleteProduct(params.productId);
        res.status(200).send({
            status: "success",
            data: { message: "Successfully deleted product." },
        });
    }
    catch (err) {
        console.log(err);
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