import { Application, Request, Response, NextFunction } from 'express';
import UserHandler from '../handlers/usersHandlers';
import  AuthToken  from '../middleware/auth.middleware';

const users_routes = (app: Application) => {
  app.get('/users', AuthToken, UserHandler.getAllUsers);
  app.get('/user/:id', AuthToken, UserHandler.getUser);
  app.post('/user/create', UserHandler.createUser);
  app.put('/user/update', AuthToken, UserHandler.updateUser);
  app.delete('/user/delete', AuthToken, UserHandler.deleteUser);
};

export default users_routes;