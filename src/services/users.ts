/* eslint-disable no-unused-vars */
import HttpException from '../common/http-exception';
import { trackTime } from '../decorators/track-time';
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

    @trackTime
    async getAll(loginSubstring: string, limit: number) {
        return  this.userRepository.getAll(loginSubstring, limit);
    }

    @trackTime
    async getById(id: string) {
        const user = await this.userRepository.getById(id);
        if (!user) throw new HttpException('User not found', 404);
        return user;
    }

    @trackTime
    async create(data: IUser) {
        return  this.userRepository.create(data);
    }

    @trackTime
    async update(id: string, data: IUser) {
        const user = await this.userRepository.updateOne(id, data);
        if (!user) throw new HttpException('User not found', 404);
        return user;
    }

    @trackTime
    async remove(id: string)  {
        const isDelete = await this.userRepository.removeOne(id);
        if (!isDelete) throw new HttpException('User not found', 404);
        return isDelete;
    }
}
