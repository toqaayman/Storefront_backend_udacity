/* Replace with your SQL commands */
CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    orderId bigint REFERENCES orders(id),
    productId bigint REFERENCES products(id),
    quantity INT
);