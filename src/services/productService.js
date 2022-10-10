const connection = require("../database/index");

function queryConnection(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                reject(err);
            }

            resolve(result);
        })
    })
}

function valueOrNull(value) {
    return value ? `"${value}"` : "NULL";
}

async function getProducts() {
    const productsQuery = "SELECT * FROM product"

    try {
        const products = await queryConnection(productsQuery);
        const parsedProducts = [];

        for (const product of products) {
            try {
                const imagesQuery = `SELECT * FROM image WHERE sku = "${product.sku}"`;
                const images = await queryConnection(imagesQuery);

                parsedProducts.push({
                    ...product, images
                })
            }
            catch (err) {
                throw err
            }
        }

        return parsedProducts;
    } catch (err) {
        throw err;
    }
}

async function getProduct(productSku) {
    const productQuery = `SELECT * FROM product WHERE sku = "${productSku}"`;
    try {
        const product = await queryConnection(productQuery);

        if (product.length > 0) {
            const imagesQuery = `SELECT * FROM image WHERE sku = "${product[0].sku}"`;
            try {
                const images = await queryConnection(imagesQuery);
                return { ...product[0], images }
            } catch (err) {
                throw err;
            }
        } else {
            throw err;
        }
    } catch (err) {
        throw err;
    }
}

async function createProduct(product) {
    const productQuery = `INSERT INTO product VALUES(
        "${product.sku}",
        "${product.name}",
        "${product.brand}",
        ${valueOrNull(product.size)},
        ${product.price}
    )`;

    try {
        await queryConnection(productQuery);
    } catch (err) {
        throw err;
    }

    let index = 1;
    for (const image of product.images) {
        const imageQuery = `INSERT INTO image(sku, sequence, url) VALUES(
            "${product.sku}",
            "${index}",
            "${image}"
        )`;

        try {
            await queryConnection(imageQuery);
            index++;
        } catch (err) {
            throw err;
        }
    }
}

async function updateProduct(product) {
    const productQuery = `UPDATE product
        SET name = "${product.name}", brand = "${product.brand}", size = ${valueOrNull(product.size)}, price = ${product.price}
        WHERE sku = "${product.sku}"`;

    try {
        await queryConnection(productQuery);

        if (product.images.length > 0) {
            try {
                const deleteImageQuery = `DELETE FROM image WHERE sku = "${product.sku}"`
                await queryConnection(deleteImageQuery);
            }
            catch (err) {
                throw err
            }
        }

        let index = 1;
        for (const image of product.images) {
            const imageQuery = `INSERT INTO image(sku, sequence, url) VALUES(
                "${product.sku}",
                "${index}",
                "${image}"
            )`;

            try {
                await queryConnection(imageQuery);
                index++;
            } catch (err) {
                throw err;
            }
        }
    } catch (err) {
        throw err;
    }
}

function deleteProduct(productSku) {
    const query = `DELETE FROM product WHERE sku = "${productSku}"`
    return queryConnection(query);
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}