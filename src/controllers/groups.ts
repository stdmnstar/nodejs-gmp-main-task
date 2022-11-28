/* eslint-disable callback-return */

import { Response, Request, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { GroupService } from '../services/groups';
import { GroupRepository } from '../repository/group';
import HttpException from '../common/http-exception';
import { getErrorMessage, getErrorStatusCode } from '../utils/utils';

const groupRepository = new GroupRepository();
const groupService = new GroupService(groupRepository);

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const group = await groupService.getAll();
        res.json(group);
    } catch (error) {
        next(new HttpException(getErrorMessage(error), getErrorStatusCode(error), 'getAll'));
    }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const group = await groupService.getById(id as string);

        res.json(group);
    } catch (error) {
        next(new HttpException(getErrorMessage(error), getErrorStatusCode(error), 'getById'));
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const group = await groupService.create({ id: uuid(), ...body });
        res.status(201).json(group);
    } catch (error) {
        next(new HttpException(getErrorMessage(error), getErrorStatusCode(error), 'create'));
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const group = await groupService.update(id as string, req.body);

        res.json(group);
    } catch (error) {
        next(new HttpException(getErrorMessage(error), getErrorStatusCode(error), 'update'));
    }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await groupService.remove(id as string);

        res.status(204).json();
    } catch (error) {
        next(new HttpException(getErrorMessage(error), getErrorStatusCode(error), 'remove'));
    }
};

const addUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupId } = req.params;
        const { userIds } = req.body;
        const usersGroup = await groupService.addUsers(groupId as string, userIds);
        res.status(201).json(usersGroup);
    } catch (error) {
        next(new HttpException(getErrorMessage(error), getErrorStatusCode(error), 'addUsers'));
    }
};

export default { getAll, getById, create, update, remove, addUsers };
