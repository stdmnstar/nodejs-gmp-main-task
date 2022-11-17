/* eslint-disable no-unused-vars */
import HttpException from '../common/http-exception';
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

    getById = async (id: string) => {
        const user = await this.userRepository.getById(id);
        if (!user) throw new HttpException(404, 'User not found');
        return user;
    };

    create = (data: IUser) => this.userRepository.create(data);

    update = async (id: string, data: IUser) => {
        const user = await this.userRepository.updateOne(id, data);
        if (!user) throw new HttpException(404, 'User not found');
        return user;
    };


    remove = async (id: string) => {
        const isDelete = await this.userRepository.removeOne(id);
        if (!isDelete) throw new HttpException(404, 'User not found');
        return isDelete;
    };
}
