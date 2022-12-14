import { Router } from 'express';
import BoardKindController from '@/controllers/boardKind.controller';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';
import validationMiddleware from '@middlewares/validation.middleware';

export default class BoardKindRoute implements I.Routes {
  public path = '/boardKind';
  public router = Router();
  public boardKindController = new BoardKindController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router
      .get(`${this.path}`, this.boardKindController.getBoardKind)
      .get(`${this.path}/:id(\\d+)`, this.boardKindController.getBoardKindById)
      .post(`${this.path}`, validationMiddleware(dto.createBoardKindDto, 'body'), this.boardKindController.createBoardKind)
      .put(`${this.path}/:id(\\d+)`, validationMiddleware(dto.createBoardKindDto, 'body', true), this.boardKindController.updateBoardKind)
      .delete(`${this.path}/:id(\\d+)`, this.boardKindController.deleteBoardKind);
  }
}
