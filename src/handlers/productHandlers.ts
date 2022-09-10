import ProductsModel from '../models/products';
import { Request, Response, NextFunction } from 'express';

const products = new ProductsModel();

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const getProducts = await products.index();
    res.send(getProducts);
  } catch (error) {
    next(error)
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const product = await products.show(id);
    res.send({
      status: 'success',
      data: { product },
      message: 'Products retrieved successfully'
    });
  } catch (error) {
    next(error)
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await products.create(req.body);
    res.send({ status: 'success',
    data: { ...newProduct },
    message: 'Product created successfully'});
  } catch (error) {
    next(error)
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedProduct = await products.update(req.body);
    res.send({
      status: 'success',
      data: { updatedProduct },
      message: 'Product updated successfully'
    });
  } catch (error) {
    next(error)
  }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.id;
    const deletedProduct = await products.delete(id);
    res.send({
      status: 'success',
      data: { deletedProduct },
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error)
  }
};

export default { deleteProduct, update, create, get, getAll}