import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface IGroup {
    id: string;
    name: string;
    permissions: Array<Permission>
}

export type GroupModel = IGroup & Model;

export const Group = db.define<GroupModel>(
    'groups',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
            allowNull: false
        }
    },
    {
        timestamps: false
    },
);

// Group.sync({ alter: true });

