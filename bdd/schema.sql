-- Création de la table 'company'
CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, 
    name VARCHAR(255) NOT NULL,
);

-- Création de la table 'product'
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    sub_category VARCHAT(255),
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

-- Création de la table 'restaurant_table'
CREATE TABLE company_table (
    id SERIAL PRIMARY KEY,
    table_number INTEGER NOT NULL,
    company_id INTEGER NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

-- Création de la table de jointure 'product_table' pour la relation entre 'product' et 'restaurant_table'
CREATE TABLE order_table (
    product_id INTEGER NOT NULL,
    table_id INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'to prepare',
    PRIMARY KEY (product_id, table_id),
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (table_id) REFERENCES company_table(id) ON DELETE CASCADE
);
