import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import * as dto from '../dtos/index.dto';
import * as I from '../interfaces';

export class BoardKindService {
  async findAllBoardKind(): Promise<I.BoardKind[]> {
    return await DB.boardKindModel.findAll();
  }

  async findBoardKindByBoardKindName(boardKindName: string) {
    const findBoard: I.BoardKind = await DB.boardKindModel.findOne({ where: { boardKind: boardKindName } });
    if (!findBoard) throw new HttpException(409, '');

    return findBoard;
  }

  async findBoardKindById(boardKindId: number): Promise<I.BoardKind> {
    const findBoardKind: I.BoardKind = await DB.boardKindModel.findByPk(boardKindId);
    if (!findBoardKind) throw new HttpException(409, '');

    return findBoardKind;
  }

  async createBoardKind(boardKindData: dto.createBoardKindDto): Promise<I.BoardKind> {
    const createBoardKindData: I.BoardKind = await DB.boardKindModel.create({ ...boardKindData });
    if (!createBoardKindData) throw new HttpException(409, '');
    return createBoardKindData;
  }

  async updateBoardKind(updateBoardKindId: number, boardKindData: dto.createBoardKindDto): Promise<I.BoardKind> {
    const fimdBoardKind: I.BoardKind = await this.findBoardKindById(updateBoardKindId);
    if (!fimdBoardKind) throw new HttpException(409, '');

    await DB.boardKindModel.update({ ...boardKindData }, { where: { boardKindId: updateBoardKindId } });
    const updateBoardKind = await this.findBoardKindById(updateBoardKindId);

    return updateBoardKind;
  }

  async deleteBoardKind(deleteBoardKindId: number): Promise<I.BoardKind> {
    const findBoard = await this.findBoardKindById(deleteBoardKindId);
    if (!findBoard) throw new HttpException(409, '');

    await DB.boardKindModel.destroy({ where: { boardKindId: deleteBoardKindId } });
    return findBoard;
  }
}
