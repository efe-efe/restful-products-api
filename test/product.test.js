let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "http://localhost:3000/api/v1";
const existingSKU = "FAL-8406270";

//TODO: Restore the DB state to its previous form before each test. Currently that is being done manually with requests.

describe("Get all products: ", () => {
    it("should provide all the products", (done) => {
        chai.request(url)
            .get("/products")
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe("Get one product: ", () => {
    const wrongSKU = "F-8406270";

    it("should provide the products with the specified SKU", (done) => {
        chai.request(url)
            .get(`/products/${existingSKU}`)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

    it("should return a bad request response", (done) => {
        chai.request(url)
            .get(`/products/${wrongSKU}`)
            .end(function (err, res) {
                expect(res).to.have.status(400);
                done();
            })
    })
});

describe("Create a product", () => {
    const SKU = "FAL-2123451";

    it("should succesfully create a product", (done) => {
        chai.request(url)
            .delete(`/products/${SKU}`)
            .end(function (err, res) {
                chai.request(url)
                    .post("/products")
                    .send({
                        sku: SKU,
                        name: "My new product",
                        brand: "The brand",
                        size: "XS",
                        price: 10990,
                        images: ["https://www.fake-url.com"]
                    })
                    .end(function (err, res) {
                        expect(res).to.have.status(200);

                        chai.request(url)
                            .get(`/products/${SKU}`)
                            .end(function (err, res) {
                                expect(res).to.have.status(200);
                                done();
                            })
                    })
            })
    })

    it("should return a bad request response", (done) => {
        const wrongSKU = "FAL-1";

        chai.request(url)
            .post("/products")
            .send({
                sku: wrongSKU,
                name: "My new product",
                brand: "The brand",
                size: "XS",
                price: 10990,
                images: ["https://www.fake-url.com"]
            })
            .end(function (err, res) {
                expect(res).to.have.status(400);
                done();
            })
    })


    it("should return a bad request response", (done) => {
        chai.request(url)
            .post("/products")
            .end(function (err, res) {
                expect(res).to.have.status(400);
                done();
            })
    })
})

describe("Update a product", () => {
    it("should succesfully update a product", (done) => {
        const updated = {
            name: "Updated product",
            brand: "Updated brand",
            size: "XS",
            price: 10990,
            images: ["https://www.fake-url.com"]
        }

        chai.request(url)
            .patch(`/products/${existingSKU}`)
            .send(updated)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
    })

    it("should return a not found response", (done) => {
        chai.request(url)
            .patch("/products")
            .end(function (err, res) {
                expect(res).to.have.status(404);
                done();
            })
    })

    it("should return a bad request response", (done) => {
        chai.request(url)
            .patch(`/products/${existingSKU}`)
            .end(function (err, res) {
                expect(res).to.have.status(400);
                done();
            })
    })

    describe('Delete a product', () => {
        it("should delete a product", (done) => {
            chai.request(url)
                .get(`/products/${existingSKU}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);

                    chai.request(url)
                        .delete(`/products/${existingSKU}`)
                        .end(function (err, res) {
                            expect(res).to.have.status(200);

                            chai.request(url)
                                .post("/products")
                                .send({
                                    sku: "FAL-8406270",
                                    name: "500 Zapatilla Urbana Mujer",
                                    brand: "New Balance",
                                    size: "37",
                                    price: 42990.00,
                                    images: ["https://falabella.scene7.com/is/image/Falabella/8406270_1"]
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200);
                                    done();
                                })
                        });
                });

        })

        it("should return a not found response", (done) => {
            chai.request(url)
                .delete("/products")
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    done();
                })
        })
    })
})