/* eslint-disable no-unused-vars */
import { Op, WhereOptions } from 'sequelize';
import { User, IUser, UserModel } from '../model/user';

export interface IUserRepository {
    getAll(loginSubstring: string, limit: number): Promise<UserModel[]>,
    getById(id: string): Promise<UserModel | null>,
    create(user: IUser): Promise<UserModel>,
    updateOne(id: string, payload: IUser): Promise<UserModel | undefined>,
    removeOne(id: string): Promise<boolean>,
}
export class UserRepository implements IUserRepository {
    getAll = async (loginSubstring: string, limit: number) => {
        let where: WhereOptions = {
            isDeleted: false
        };

        if (loginSubstring) {
            where = {
                ...where,
                login: {
                    [Op.iLike]: `%${loginSubstring}%`
                }
            };
        }

        return User.findAll({
            where,
            order: ['login'],
            limit
        });
    };

    getById = async (id: string) => {
        return await User.findOne({
            where: {
                id,
                isDeleted: false
            }
        });
    };

    create = async (user: IUser) => User.create({ ...user }, { returning: true });


    updateOne = async (id: string, payload: IUser) => {
        const [, [updatedUser]] = await User.update(payload, {
            where: {
                id,
                isDeleted: false
            },
            returning: true
        });
        return updatedUser;
    };

    removeOne = async (id: string) => {
        const [, [deletedUser]] = await User.update({ isDeleted: true }, {
            where: {
                id,
                isDeleted: false
            },
            returning: true
        });
        return Boolean(deletedUser);
    };
}
