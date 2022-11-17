/* eslint-disable callback-return */
import { Response, Request, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { GroupService } from '../services/groups';
import { GroupRepository } from '../repository/group';

const groupRepository = new GroupRepository();
const groupService = new GroupService(groupRepository);

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

        res.json(group);
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

        res.json(group);
    } catch (error) {
        next(error);
    }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await groupService.remove(id as string);

        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

const addUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupId } = req.params;
        const { userIds } = req.body;
        const usersGroup = await groupService.addUsers(groupId as string, userIds);
        res.status(201).json(usersGroup);
    } catch (error) {
        next(error);
    }
};

export default { getAll, getById, create, update, remove, addUsers };
