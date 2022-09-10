import OrdersModel from '../models/orders';
import app from '../index';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const order = new OrdersModel();

const request = supertest(app);

const newUser = {
  firstName: 'santy',
  lastName: 'ayman',
  password: '3263232',
};

const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);

describe('Testing Orders Methods', () => {
  it('A method that get all orders', () => {
    expect(order.index).toBeDefined();
  });

  it('A method that get a specific order', () => {
    expect(order.show).toBeDefined();
  });

  it('A method that create a new order', () => {
    expect(order.create).toBeDefined();
  });
  it('A method that update data of an order', () => {
    expect(order.update).toBeDefined();
  });
  it('A method that delete an order', () => {
    expect(order.delete).toBeDefined();
  });
});
describe('Testing orders Endpoints.', () => {
  it('GET /orders without a token', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(401);
  });
  it('GET /orders with a token', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('GET /order/:id without a token ', async () => {
    const response = await request.get('/order/1');
    expect(response.status).toBe(401);
  });
  it('GET /order/:id with a token ', async () => {
    const response = await request
      .get('/order/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('POST /order/create without a token', async () => {
    const response = await request.post('/order/create').send({
      status: 'test',
      userId: 1,
    });
    expect(response.status).toBe(401);
  });
  it('POST /order/create with a token', async () => {
    const response = await request
      .post('/order/create')
      .send({
        status: 'test',
        userId: 1,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('PUT /order/update without prodiving a token', async () => {
    const response = await request.put('/order/update').send({
      id: 1,
      status: 'update',
      userId: 1,
    });
    expect(response.status).toBe(401);
  });

  it('PUT /order/update with providing a token', async () => {
    const response = await request
      .put('/order/update')
      .send({
        id: 1,
        status: 'update',
        userId: 1,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(500);
  });
  it('DELETE /order/delete without prodiving a token', async () => {
    const response = await request.delete('/order/delete').send({
      id: 1,
    });
    expect(response.status).toBe(401);
  });

  it('DELETE /order/delete with providing a token', async () => {
    const response = await request
      .delete('/order/delete')
      .send({
        id: 1,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(500);
  });
});