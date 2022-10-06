function getProducts() {
    console.log("Get all products");
}

function getProduct(productId) {
    console.log(`Get product: ${productId}`);
}

function postProduct(productId) {
    console.log(`Create product: ${productId}`);
}

function patchProduct(productId) {
    console.log(`Update product: ${productId}`);
}

function deleteProduct(productId) {
    console.log(`Delete product: ${productId}`);
}

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    patchProduct,
    deleteProduct
}