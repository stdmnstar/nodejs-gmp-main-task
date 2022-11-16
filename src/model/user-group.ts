// import { DataTypes, Model } from 'sequelize';
import { Model } from 'sequelize';
import { db } from '../database/db';
import { Group } from './group';
import { User } from './user';

export const UserGroup = db.define<Model>(
    'UserGroup',
    {},
    {
        timestamps: false,
        tableName: 'user_groups'
    }
);

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });
