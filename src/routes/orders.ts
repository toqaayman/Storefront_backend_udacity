import OrderHandler from '../handlers/orderHandlers';
import { Application } from 'express';
import AuthToken from '../middleware/auth.middleware';


const OrdersRoutes = (app: Application) => {
  app.get('/orders', AuthToken, OrderHandler.getAll);
  app.get('/order/:id', AuthToken, OrderHandler.get);
  app.post('/order/create', AuthToken, OrderHandler.create);
  app.put('/order/update', AuthToken, OrderHandler.update);
  app.delete('/order/delete', AuthToken, OrderHandler.deleteO);
};

export default OrdersRoutes;