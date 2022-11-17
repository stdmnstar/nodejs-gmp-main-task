/* eslint-disable no-unused-vars */
import { db } from './../database/db';
import { Group, IGroup, GroupModel } from '../model/group';
import { UserGroup, UserGroupModel } from '../model/user-group';
import HttpException from '../common/http-exception';
import { getErrorMessage } from '../utils/utils';

export interface IGroupRepository {
    getAll(): Promise<GroupModel[]>,
    getById(id: string): Promise<GroupModel | null>,
    create(group: IGroup): Promise<GroupModel>,
    updateOne(id: string, payload: IGroup): Promise<GroupModel | undefined>,
    removeOne(id: string): Promise<boolean>,
    addUsers(groupId: string, userIds: string[]): Promise<UserGroupModel[] | undefined>,
}
export class GroupRepository implements IGroupRepository {
    getAll = () => Group.findAll();

    getById = (id: string) => Group.findOne({ where: { id } });

    create = (group: IGroup) => Group.create({ ...group }, { returning: true });

    updateOne = async (id: string, payload: IGroup) => {
        const [, [updatedGroup]] = await Group.update(payload, {
            where: { id },
            returning: true
        });
        return updatedGroup;
    };

    removeOne = async (id: string) => {
        const group = await Group.destroy({ where: { id } });
        return Boolean(group);
    };

    addUsers = async (groupId: string, userIds: string[]) => {
        const usersAndGroup = userIds.map((userId) => ({ userId, groupId }));
        try {
            return await db.transaction(async (t) => await UserGroup.bulkCreate(usersAndGroup, { transaction: t }));
        } catch (error) {
            throw new HttpException(400, getErrorMessage(error));
        }
    };
}
