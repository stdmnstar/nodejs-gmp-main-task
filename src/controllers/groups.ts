/* eslint-disable callback-return */
import { Response, Request, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { GroupService } from '../services/groups';
import { GroupRepository } from '../repository/group';

const groupRepository = new GroupRepository();
const groupService = new GroupService(groupRepository);

const groupNotFoundMessage = {
    message: 'Error! Group not found.'
};

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const group = await groupService.getAll();
        res.json(group);
    } catch (error) {
        next(error);
    }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const group = await groupService.getById(id as string);

        if (group) {
            res.json(group);
        } else {
            res.status(404).json(groupNotFoundMessage);
        }
    } catch (error) {
        next(error);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const group = await groupService.create({ id: uuid(), ...body });
        res.status(201).json(group);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const group = await groupService.update(id as string, req.body);

        if (group) {
            res.json(group);
        } else {
            res.status(404).json(groupNotFoundMessage);
        }
    } catch (error) {
        next(error);
    }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const isDelete = await groupService.remove(id as string);

        if (isDelete) {
            res.status(204).json();
        } else {
            res.status(404).json(groupNotFoundMessage);
        }
    } catch (error) {
        next(error);
    }
};

export default { getAll, getById, create, update, remove };
