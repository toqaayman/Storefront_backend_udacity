/* Replace with your SQL commands */
CREATE TABLE orders_products (
    id SERIAL,
    OrderID INT,
    ProductID INT,
    PRIMARY KEY (OrderID, ProductID),
    quantity INT,
    CONSTRAINT FK_orders FOREIGN KEY(OrderID) REFERENCES orders(id),
    CONSTRAINT FK_products FOREIGN KEY(ProductID) REFERENCES products(id)
);