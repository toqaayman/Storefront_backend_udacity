/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    ProductID INT REFERENCES products(id),
    status VARCHAR(20),
    userId INT REFERENCES users(id),
    quantity INT
);