-- TODO: Move everything into a migration file
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS product;

CREATE TABLE IF NOT EXISTS product (
    sku VARCHAR(13) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    size VARCHAR(3),
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS image (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(13),
    sequence INT,
    url TEXT
);

ALTER TABLE image
ADD FOREIGN KEY(sku)
REFERENCES product(sku)
ON DELETE SET NULL;

INSERT INTO product VALUES(
    "FAL-8406270",
    "500 Zapatilla Urbana Mujer",
    "New Balance",
    "37",
    42990.00
);

INSERT INTO image(sku, sequence, url) VALUES(
    "FAL-8406270",
    "1",
    "https://falabella.scene7.com/is/image/Falabella/8406270_1"
);

INSERT INTO product VALUES(
    "FAL-881952283",
    "Bicicleta Baltoro Aro 29",
    "Jeep",
    "ST",
    399990.00
);

INSERT INTO image(sku, sequence, url) VALUES(
    "FAL-881952283",
    "1",
    "https://falabella.scene7.com/is/image/Falabella/881952283_1"
);

INSERT INTO image(sku, sequence, url) VALUES(
    "FAL-881952283",
    "2",
    "https://falabella.scene7.com/is/image/Falabella/881952283_2"
);

INSERT INTO product VALUES(
    "FAL-881898502",
    "Camisa Manga Corta Hombre",
    "Basement",
    "M",
    24990.00
);

INSERT INTO image(sku, sequence, url) VALUES(
    "FAL-881898502",
    "1",
    "https://falabella.scene7.com/is/image/Falabella/881898502_1"
);
