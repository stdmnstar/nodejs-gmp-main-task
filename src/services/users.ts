/* eslint-disable no-unused-vars */
import { IUser } from '../model/user';
import { IUserRepository } from '../repository/user';

interface IUserService {
    getAll(loginSubstring: string, limit: number): Promise<IUser[]>,
    getById(id: string): Promise<IUser | null>,
    create(user: IUser): Promise<IUser>,
    update(id: string, payload: IUser): Promise<IUser | undefined>,
    remove(id: string): Promise<boolean>,
}

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    getAll = (loginSubstring: string, limit: number) => this.userRepository.getAll(loginSubstring, limit);

    getById = (id: string) => this.userRepository.getById(id);

    create = (data: IUser) => this.userRepository.create(data);

    update = (id: string, data: IUser) => this.userRepository.updateOne(id, data);

    remove = (id: string) => this.userRepository.removeOne(id);
}
