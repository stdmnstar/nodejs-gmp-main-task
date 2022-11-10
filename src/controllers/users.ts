import { Response, Request } from 'express';
import { v4 as uuid } from 'uuid';
import userService from '../services/users';

const getAll = async (req: Request, res: Response) => {
    const { loginSubstring, limit } = req.query;


    const users =  await userService.getAutoSuggest(loginSubstring as string, limit as unknown as number);
    res.status(200).json(users);
};

const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getById(id as string);
    res.status(200).json(user);
};

const create = async (req: Request, res: Response) => {
    const { body } = req;
    const newUser = { id: uuid(), ...body, isDeleted: false };
    await userService.create(newUser);
    res.status(200).json(newUser);
};

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await userService.update(id as string, req.body);
    console.log(user);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json('User not found');
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    const isDelete = await userService.remove(id as string);
    // eslint-disable-next-line no-unused-expressions
    isDelete ? res.status(204).json() : res.status(404).json({ message: 'User not found' });
};

export default { getAll, getById, create, update, remove };
