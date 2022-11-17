// import { DataTypes, Model } from 'sequelize';
import { Model } from 'sequelize';
import { db } from '../database/db';
import { Group } from './group';
import { User } from './user';

export interface IUsersGroup {
    userIds: string[];
    groupId: string;
}

export type UserGroupModel = IUsersGroup & Model;

export const UserGroup = db.define<UserGroupModel>(
    'UserGroup',
    {},
    {
        timestamps: false,
        tableName: 'user_groups'
    }
);

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });
