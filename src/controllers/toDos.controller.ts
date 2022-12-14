import { NextFunction, Request, Response } from 'express';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';
import * as S from '../services/index.service';

class ToDosController {
  public toDosService = new S.ToDosService();

  async getToDos(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllToDos: I.ToDos[] = await this.toDosService.findAllToDos();
      res.status(200).json({ data: findAllToDos, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  }

  async getToDoById(req: Request, res: Response, next: NextFunction) {
    try {
      const toDoId = Number(req.params.id);
      const findOneToDoData: I.ToDos = await this.toDosService.findToDosById(toDoId);

      res.status(200).json({ data: findOneToDoData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }

  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const toDoData: dto.CreateTodoDto = req.body;
      const createToDoData: I.ToDos = await this.toDosService.createTodo(toDoData);

      res.status(201).json({ data: createToDoData, message: '성공' });
    } catch (error) {
      next(error);
    }
  }

  async updatetoDo(req: Request, res: Response, next: NextFunction) {
    try {
      const toDoId = Number(req.params.id);
      const toDoData: dto.CreateTodoDto = req.body;
      const updateUserData: I.ToDos = await this.toDosService.updateToDo(toDoId, toDoData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  async deletetoDo(req: Request, res: Response, next: NextFunction) {
    try {
      const toDoId = Number(req.params.id);
      const deleteToDoData: I.ToDos = await this.toDosService.deleteToDo(toDoId);

      res.status(200).json({ data: deleteToDoData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }

  async updateSuccessState(req: Request, res: Response, next: NextFunction) {
    try {
      const toDoId = Number(req.params.id);
      const updateSuccessState: I.ToDos = await this.toDosService.updateSuccessState(toDoId);

      res.status(200).json({ data: updateSuccessState, message: 'SuccessState Update' });
    } catch (error) {
      next(error);
    }
  }
}

export default ToDosController;
