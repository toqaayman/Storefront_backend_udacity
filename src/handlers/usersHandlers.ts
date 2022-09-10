import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UsersModel from '../models/users'

const users = new UsersModel();

const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const getUsers = await users.index();
      res.send(getUsers);
    } catch (error) {
      next(error)
    }
  };
  
  const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const user = await users.select(id);
      res.send(user);
    } catch (error) {
      next(error)
    }
  };
  
  const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, password } = req.body;
      const newUser = await users.create(req.body);
      const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);
      res.status(200).json(token);
    } catch (error) {
      next(error)
    }
  };
  
  const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, firstName, lastName, password } = req.body;
      const updatedUser = await users.update(req.body);
      res.send(updatedUser);
    } catch (error) {
      next(error)
    }
  };
  
  const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.body.id;
      const deletedUser = await users.delete(id);
      res.send(deletedUser);
    } catch (error) {
      next(error)
    }
  };

  export default { deleteUser, updateUser, createUser,getUser, getAllUsers}