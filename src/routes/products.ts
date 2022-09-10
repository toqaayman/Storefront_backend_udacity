import ProductHandler from '../handlers/productHandlers';
import { Application } from 'express';
import AuthToken from '../middleware/auth.middleware';


const ProductsRoutes = (app: Application) => {
  app.get('/products', ProductHandler.getAll);
  app.get('/product/:id', ProductHandler.get);
  app.post('/product/create', AuthToken, ProductHandler.create);
  app.put('/product/update', AuthToken, ProductHandler.update);
  app.delete('/product/delete', AuthToken, ProductHandler.deleteProduct);
};

export default ProductsRoutes;