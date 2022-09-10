import OrdersModel from '../models/orders';
import { Application, Request, Response, NextFunction } from 'express';

const orders = new OrdersModel();

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getOrders = await orders.index();
    res.send(getOrders);
  } catch (error) {
    next(error)
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const order = await orders.show(id);
    res.send(order);
  } catch (error) {
    next(error)  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newOrder = await orders.create(req.body);
    res.send({status: 'success',
    data: { ...newOrder },
    message: 'Order created successfully'});
  } catch (error) {
    next(error)  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedOrder = await orders.update(req.body);
    res.send({status: 'success',
    data: { ...updatedOrder },
    message: 'Order updated successfully'});
  } catch (error) {
    next(error)  }
};

const deleteO = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.id;
    const deletedOrder = await orders.delete(id);
    res.send({status: 'success',
    data: { ...deletedOrder },
    message: 'Order deleted successfully'});
  } catch (error) {
    next(error)  }
};

export default { deleteO, update, create, get, getAll}