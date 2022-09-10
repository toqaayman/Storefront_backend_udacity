import ProductsModel from '../models/products';
import app from '../index';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const product = new ProductsModel();

const request = supertest(app);

const newUser = {
  firstName: 'santy',
  lastName: 'ayman',
  password: '12345679526318',
};

const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);

describe('Testing Prodcuts Methods', () => {
  it('A method that get all products', () => {
    expect(product.index).toBeDefined();
  });

  it('A method that get a specific product', () => {
    expect(product.show).toBeDefined();
  });

  it('A method that create a new product', () => {
    expect(product.create).toBeDefined();
  });
  it('A method that update data of a product', () => {
    expect(product.update).toBeDefined();
  });
  it('A method that delete a product', () => {
    expect(product.delete).toBeDefined();
  });
});
describe('Testing products Endpoints.', () => {
  it('GET /products', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('GET /product/:id ', async () => {
    const response = await request.get('/product/1');
    expect(response.status).toBe(500);
  });

  it('POST /product/create without a token', async () => {
    const response = await request.post('/product/create').send({
      name: 'test',
      price: 123,
    });
    expect(response.status).toBe(401);
  });
  it('POST /product/create with a token', async () => {
    const response = await request
      .post('/product/create')
      .send({
        name: 'test',
        price: 123,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('PUT /product/update without prodiving a token', async () => {
    const response = await request.put('/product/update').send({
      id: 1,
      name: 'update',
      price: 321,
    });
    expect(response.status).toBe(401);
  });

  it('PUT /product/update with providing a token', async () => {
    const response = await request
      .put('/product/update')
      .send({
        id: 1,
        name: 'update',
        price: 321,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(500);
  });
  it('DELETE /product/delete without prodiving a token', async () => {
    const response = await request.delete('/product/delete').send({
      id: 1,
    });
    expect(response.status).toBe(401);
  });

  it('DELETE /product/delete with providing a token', async () => {
    const response = await request
      .delete('/product/delete')
      .send({
        id: 1,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});