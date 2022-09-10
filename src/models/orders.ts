import client from '../database/db';
import Order from '../types/orders.type'
import ProductsModel from './products';


class OrdersModel {

  private formatOrder(order: {
    id?: number | undefined;
    status: string;
    user_id: number;
    products: ProductsModel[];
    quantity: number;
  }): Order {
    return {
      id: order.id,
      status: order.status,
      userId: order.user_id,
      quantity: order.quantity
    };
  }

 index = async(): Promise<Order[]> => {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await connection.query(sql);
      connection.release();
      return result.rows.map((o) => this.formatOrder(o));
    } catch (error) {
      throw new Error(
        `Error at retrieving products ${error}`
      );
    }
  }

  show = async (userId: number): Promise<Order[]> => {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders WHERE userId=($1)';
      const result = await connection.query(sql, [userId]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get the order with the following error: ${error}`
      );
    }
  }

  create = async (o: Order): Promise<Order> => {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO orders (status,userId) VALUES($1, $2) RETURNING *';
      const result = await connection.query(sql, [o.status, o.userId]);
      connection.release();
      const order = result.rows[0];

      return {
        id: order.id,
        status: order.status,
        userId: +order.user_id,
        quantity: order.quantity
    }
    } catch (error) {
      throw new Error(
        `Could not create order ${error}`
      );
    }
  }

  update = async (o: Order): Promise<Order> => {
    try {
      const connection = await client.connect();
      const sql = 'UPDATE orders SET status=($2) WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [o.id, o.status]);
      connection.release();
      const order = result.rows[0];
      return {
        id: order.id,
        status: order.status,
        userId: +order.user_id,
        quantity: order.quantity
      };
    } catch (error) {
      throw new Error(
        `Failed to update order ${error}`
      );
    }
  }

  delete = async (id: number): Promise<Order> => {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      const order = result.rows[0];
      return {
        id: order.id,
        status: order.status,
        userId: +order.user_id,
        quantity: order.quantity
      }
    } catch (error) {
      throw new Error(
        `Failed to delete order ${error}`
      );
    }
  }
}

export default OrdersModel