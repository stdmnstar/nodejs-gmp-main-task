/* eslint-disable callback-return */
import { Response, Request, NextFunction } from 'express';
import { UserService } from '../services/users';
import { UserRepository } from '../data-access/user.repository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const userNotFoundMessage = {
    message: 'Error! User not found.'
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { loginSubstring, limit } = req.query;
        const users = await userService.getAll(loginSubstring as string, limit as unknown as number);
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.getById(id as string);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json(userNotFoundMessage);
        }
    } catch (error) {
        next(error);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const newUser = await userService.create(body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.update(id as string, req.body);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json(userNotFoundMessage);
        }
    } catch (error) {
        next(error);
    }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const isDelete = await userService.remove(id as string);

        if (isDelete) {
            res.status(204).json();
        } else {
            res.status(404).json(userNotFoundMessage);
        }
    } catch (error) {
        next(error);
    }
};

export default { getAll, getById, create, update, remove };
