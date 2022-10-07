function getProducts() {
    console.log("Get all products");
}

function getProduct(productId) {
    console.log(`Get product: ${productId}`);
}

function createProduct(productId) {
    console.log(`Create product: ${productId}`);
}

function updateProduct(productId) {
    console.log(`Update product: ${productId}`);
}

function deleteProduct(productId) {
    console.log(`Delete product: ${productId}`);
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}