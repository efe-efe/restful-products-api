DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
    sku VARCHAR(13) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    size VARCHAR(3),
    price DECIMAL(10,2) NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO products VALUES(
    "FAL-8406270",
    "500 Zapatilla Urbana Mujer",
    "New Balance",
    "37",
    42990.00,
    "https://falabella.scene7.com/is/image/Falabella/8406270_1"
);

INSERT INTO products VALUES(
    "FAL-881952283",
    "Bicicleta Baltoro Aro 29",
    "Jeep",
    "ST",
    399990.00,
    "https://falabella.scene7.com/is/image/Falabella/881952283_1"
);
-- https://falabella.scene7.com/is/image/Falabella/881952283_2 TODO: Make it so you can save multiple images

INSERT INTO products VALUES(
    "FAL-881898502",
    "Camisa Manga COrta Hombre",
    "Basement",
    "M",
    24990.00,
    "https://falabella.scene7.com/is/image/Falabella/881898502_1"
);