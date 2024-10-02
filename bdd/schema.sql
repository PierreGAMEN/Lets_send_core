CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES company(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    sub_category VARCHAR(255)
);

CREATE TABLE company_table (
    id SERIAL PRIMARY KEY,
    table_number INTEGER NOT NULL,
    company_id INTEGER NOT NULL REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_right VARCHAR(255) NOT NULL,
    company_id INTEGER NOT NULL REFERENCES company(id) ON DELETE CASCADE
);

CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES company(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    date TIMESTAMP NOT NULL,
    self_payment BOOLEAN NOT NULL
);

CREATE TABLE order_table (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    table_id INTEGER NOT NULL REFERENCES company_table(id) ON DELETE CASCADE,
    company_id INTEGER NOT NULL REFERENCES company(id) ON DELETE CASCADE,
    table_number INTEGER NOT NULL,
    status VARCHAR(255) DEFAULT 'preparation',
    comment TEXT,
    payment BOOLEAN
);

-- Relation many-to-many between product and company_table through order_table
CREATE TABLE product_company_table (
    product_id INTEGER NOT NULL REFERENCES product(id),
    table_id INTEGER NOT NULL REFERENCES company_table(id),
    PRIMARY KEY (product_id, table_id)
);

