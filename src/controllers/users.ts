/* eslint-disable callback-return */
import { Response, Request, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import userService from '../services/users';

const userNotFoundMessage = {
    message: 'Error! User not found.'
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { loginSubstring, limit } = req.query;
        const users = await userService.getAutoSuggest(loginSubstring as string, limit as unknown as number);
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.getById(id as string);
        if (!user) {
            res.status(404).json(userNotFoundMessage);
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const newUser = { id: uuid(), ...body, isDeleted: false };
        await userService.create(newUser);
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
        // eslint-disable-next-line no-unused-expressions
        isDelete ? res.status(204).json() : res.status(404).json(userNotFoundMessage);
    } catch (error) {
        next(error);
    }
};

export default { getAll, getById, create, update, remove };
