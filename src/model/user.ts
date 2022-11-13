import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';

export interface IUser {
    id?: string;
    login: string;
    password: string;
    age: number;
    isDeleted?: boolean;
}

export type UserModel = IUser & Model;

export const User = db.define<UserModel>(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        timestamps: false
    },
);

