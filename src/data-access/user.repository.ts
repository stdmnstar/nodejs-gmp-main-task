import { userInMemory } from '../db/user';
import { User } from '../types/types';

const getAll = async () => userInMemory.filter((user: User) => !user.isDeleted);
// const getAll = async () => userInMemory.map((user: User) => user);

const getById = async (id: string) => userInMemory.find((user: User) => user.id === id);

const create = async (user: User) => userInMemory.push(user);

const update = async (id: string, payload: User) => {
    const index = userInMemory.findIndex((user) => user.id === id && !user.isDeleted);
    if (index === -1) return null;
    const user = userInMemory[index];
    userInMemory[index] = {
        ...user,
        ...payload
    };

    return getById(id);
};

const remove = async (id: string) => {
    const index = userInMemory.findIndex((user) => user.id === id && !user.isDeleted);
    if (index === -1) return false;
    const user = userInMemory[index];
    if (user) {
        user.isDeleted = true;
        return true;
    }
    return false;
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};
