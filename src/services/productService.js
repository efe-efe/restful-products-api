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

async function getProducts() {
    const query = "SELECT * FROM product";
    return queryConnection(query);
}

function getProduct(productId) {
    const query = `SELECT * FROM product WHERE sku = "${productId}"`;
    return queryConnection(query);
}

//TODO: Should allow multiple images
function createProduct(product) {
    const query = `INSERT INTO product VALUES(
        "${product.sku}",
        "${product.name}",
        "${product.brand}",
        "${product.size}",
        ${product.price},
        "${product.image}"
    )`;
    return queryConnection(query);
}

function updateProduct(product) {
    const query = `UPDATE product
        SET name = "${product.name}", brand = "${product.brand}", size = "${product.size}", price = ${product.price}, image = "${product.image}"
        WHERE sku = "${product.sku}"`;
    return queryConnection(query);
}

function deleteProduct(productId) {
    const query = `DELETE FROM product WHERE sku = "${productId}"`
    return queryConnection(query);
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}