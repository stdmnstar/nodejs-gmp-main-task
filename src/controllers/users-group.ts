/* eslint-disable callback-return */
import { Response, Request, NextFunction } from 'express';
import { UsersGroupService } from '../services/users-group';
import { UsersGroupRepository } from '../repository/users-group';

const usersGroupRepository = new UsersGroupRepository();
const usersGroupService = new UsersGroupService(usersGroupRepository);

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupId, userIds } = req.body;
        const usersGroup = await usersGroupService.create(groupId, userIds);
        res.status(201).json(usersGroup);
    } catch (error) {
        next(error);
    }
};

export default { create };
