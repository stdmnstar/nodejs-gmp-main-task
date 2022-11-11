// import { userInMemory } from '../db/user';
import { User } from '../types/types';
import usersRepo from '../data-access/user.repository';

const getAll = () => usersRepo.getAll();

const getAutoSuggest = async (loginSubstring: string, limit: number) => {
    let users = await getAll();

    users = users.sort((a, b) => a.login.localeCompare(b.login));

    if (loginSubstring) {
        users = users.filter((user) => user.login.toLowerCase().includes(loginSubstring.toLowerCase()));
    }

    return limit ? users.slice(0, limit) : users;
};

const getById = (id: string) => usersRepo.getById(id);

const create = (data: User) => usersRepo.create(data);

const update = (id: string, data: User) => usersRepo.update(id, data);

const remove = (id: string) => usersRepo.remove(id);

export default {
    getAll,
    getAutoSuggest,
    getById,
    create,
    update,
    remove
};
