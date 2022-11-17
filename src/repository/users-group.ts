import { db } from './../database/db';
/* eslint-disable no-unused-vars */
import { UserGroup, UserGroupModel } from '../model/user-group';

export interface IUsersGroupRepository {
    create(groupId: string, userIds: string[]): Promise<UserGroupModel[]>,
}
export class UsersGroupRepository implements IUsersGroupRepository {
    create = async (groupId: string, userIds: string[]) => {
        const usersAndGroup = userIds.map((userId) => ({ userId, groupId }));
        return await db.transaction(async (t) => await UserGroup.bulkCreate(usersAndGroup, { transaction: t }));
    };
}
