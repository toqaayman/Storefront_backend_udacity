# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
  * Method           -  GET
  * Parameters        - none
  * Use             - list all products
  * http://localhost:3000/products
- Show
  * Method           -  GET
  * Parameters        - id
  * Usage             - list a specific product
  * http://localhost:3000/product/:id
- Create [token required]
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        - name, price
  * Usage             -  create a new product
  * http://localhost:3000/product/create
- Update
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        -  id, name, price
  * Usage             -  edit an exciting product
  * http://localhost:3000/product/update

- Delete
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        -  id
  * Usage             -  Delete an exciting product
  * http://localhost:3000/product/delete

#### Users
- Index 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - none
  * Usage             - list all users
  * http://localhost:3000/users

- Show 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - id
  * Usage             - list a specific User
  * http://localhost:3000/user/:id
 

- Create
  * Method           -  POST
  * Parameters        - firstName, lastName, password
  * Usage             -  create a new User
  * http://localhost:3000/user/create


- Update
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        -  id, firstName, lastName, password
  * Usage             -  edit an exciting User
  * http://localhost:3000/user/update

- Delete
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        -  id
  * Usage             -  Delete an exciting User
  * http://localhost:3000/user/delete

#### Orders
- Index 
  * Method           -  GET
  * Parameters        - none
  * Usage             - list all products
  * http://localhost:3000/products

- Show 
  * Method           -  GET
  * Parameters        - id
  * Usage             - list a specific product
  * http://localhost:3000/product/:id
 

- Create
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        - name, price
  * Usage             -  create a new product
  * http://localhost:3000/product


- Update
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        -  id, name, price
  * Usage             -  edit an exciting product
  * http://localhost:3000/product

- Delete
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        -  id
  * Usage             -  Delete an exciting product
  * http://localhost:3000/product


## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

### Data Schema
#### Users Table

| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| firstName | VARCHAR(100) | NOT NULL |
| lastName | VARCHAR(100) | NOT NULL |
| password | VARCHAR(255) | NOT NULL |
#### Products Table
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| price | INT | NOT NULL |

#### Orders Table
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| status | VARCHAR(20) | |
| userId |INT |  REFERENCES users(id) |
| quantity |INT | ------------------  |
| ProductID |INT |  REFERENCES products(id) |
