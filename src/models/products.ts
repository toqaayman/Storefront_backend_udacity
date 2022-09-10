import client from '../database/db';
import Product from '../types/products.type'

class ProductsModel {
  
  private formatProduct(product: {
    id?: number | undefined;
    name: string;
    price: string;
  }): Product {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }

  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to retrieve the products ${error}`
      );
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return this.formatProduct(result.rows[0])    
    } catch (error) {
      throw new Error(
        `Failed to get the product ${error}`
      );
    }
  }

  async create(p : Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO products (name,price) VALUES($1, $2) RETURNING *';
      const result = await connection.query(sql, [p.name, p.price]);
      connection.release();
      return this.formatProduct(result.rows[0]);
    } catch (error) {
      throw new Error(
        `Failed to create the product ${error}`
      );
    }
  }

  async update(p: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql =
        'UPDATE products SET name=($2), price=($3) WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [p.id, p.name, p.price]);
      connection.release();
      return this.formatProduct(result.rows[0])
    } catch (error) {
      throw new Error(
        `Failed to update product ${error}`
      );
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to delete product with the following error: ${error}`
      );
    }
  }
}

export default ProductsModel