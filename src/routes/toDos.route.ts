import { Router } from 'express';
import ToDosController from '@/controllers/toDos.controller';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';
import validationMiddleware from '@middlewares/validation.middleware';

class ToDosRoute implements I.Routes {
  public path = '/toDos';
  public router = Router();
  public toDosController = new ToDosController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .get(`${this.path}`, this.toDosController.getToDos)
      .get(`${this.path}/:id(\\d+)`, this.toDosController.getToDoById)
      .post(`${this.path}`, validationMiddleware(dto.CreateTodoDto, 'body'), this.toDosController.createTodo)
      .put(`${this.path}/:id(\\d+)`, validationMiddleware(dto.CreateTodoDto, 'body', true), this.toDosController.updatetoDo)
      .get(`${this.path}/success/:id(\\d+)`, this.toDosController.updateSuccessState)
      .delete(`${this.path}/:id(\\d+)`, this.toDosController.deletetoDo);
  }
}

export default ToDosRoute;
