/* eslint-disable callback-return */
import { Response, Request, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { UserService } from '../services/users';
import { UserRepository } from '../repository/user';
import HttpException from '../common/http-exception';
import { getErrorMessage, getErrorStatusCode } from '../utils/utils';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { loginSubstring, limit } = req.query;
        const users = await userService.getAll(loginSubstring as string, limit as unknown as number);
        res.json(users);
    } catch (error) {
        next(new HttpException(getErrorMessage(error), getErrorStatusCode(error), 'getAll'));
    }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.getById(id as string);
        res.json(user);
    } catch (error) {
        next(new HttpException(getErrorMessage(error), getErrorStatusCode(error), 'getById'));
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const newUser = await userService.create({ id: uuid(), ...body, isDeleted: false });
        res.status(201).json(newUser);
    } catch (error) {
        next(new HttpException(getErrorMessage(error), getErrorStatusCode(error), 'create'));
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.update(id as string, req.body);

        res.json(user);
    } catch (error) {
        next(new HttpException(getErrorMessage(error), getErrorStatusCode(error), 'update'));
    }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await userService.remove(id as string);
        res.status(204).json();
    } catch (error) {
        next(new HttpException(getErrorMessage(error), getErrorStatusCode(error), 'remove'));
    }
};

export default { getAll, getById, create, update, remove };
