import express from 'express';
import request, { Response } from 'supertest';
import * as http from 'http';
import { User } from '../model/user';
import { Group } from '../model/group';
import { UserGroup } from '../model/user-group';
import { db } from '../database/db';
import { usersRouter } from '../routes/users';

const port = 5000;
const appMock = express();

let server: http.Server;

appMock.use(express.json());
appMock.use('/users', usersRouter);

const user1Mock = {
    login: 'Login1',
    password: 'password1',
    age: 23
};

const user2Mock = {
    login: 'Login2',
    password: 'password2',
    age: 50
};

const user3Mock = {
    login: 'L',
    password: 'password',
    age: 50
};

let userIdMock: number;

beforeAll(async () => {
    await db
        .authenticate()
        .then(async () => {
            await User.sync();
            await Group.sync();
            await UserGroup.sync();
            server = appMock.listen(port);
        })
        .catch(err => console.error(err));
});

afterAll(async () => {
    await User.drop({ cascade: true });
    await Group.drop({ cascade: true });
    await UserGroup.drop({});
    server.close();
});

describe('Create user', () => {
    it('should create new user', async () => {
        await request(appMock)
            .post('/users')
            .send(user1Mock)
            .expect(201)
            .expect((res: Response) => {
                expect(res.body.id).toBeTruthy();
                userIdMock = res.body.id;
            });
    });

    it('should not create new user', async () => {
        await request(appMock)
            .post('/users')
            .send(user3Mock)
            .expect(400);
    });
});

describe('Get user by id', () => {
    it('should find user with passed id', async () => {
        await request(appMock)
            .get(`/users/${userIdMock}`)
            .expect(200)
            .expect((res: Response) => {
                expect(res.body.login).toBe(user1Mock.login);
                expect(res.body.password).toBe(user1Mock.password);
                expect(res.body.age).toBe(user1Mock.age);
            });
    });

    it('should not find user with passed id', async () => {
        await request(appMock)
            .get('/users/8696e982-e93d-4c40-abda-991ed5917616')
            .expect(404);
    });
});

describe('Update user by id', () => {
    it('should update user with passed id', async () => {
        await request(appMock)
            .put(`/users/${userIdMock}`)
            .send(user2Mock)
            .expect(200)
            .expect((res: Response) => {
                expect(res.body.login).toBe(user2Mock.login);
                expect(res.body.password).toBe(user2Mock.password);
                expect(res.body.age).toBe(user2Mock.age);
            });
    });

    it('should not update user with passed id', async () => {
        await request(appMock)
            .put('/users/8696e982-e93d-4c40-abda-991ed5917616')
            .send(user2Mock)
            .expect(404);
    });
});

describe('Get all users', () => {
    it('should get all users', async () => {
        await request(appMock)
            .get('/users')
            .expect(200)
            .expect((res: Response) => {
                expect(res.body.length).toBeGreaterThan(0);
            });
    });
});

describe('Delete user', () => {
    it('should deleted user with passed id', async () => {
        await request(appMock).delete(`/users/${userIdMock}`).expect(204);
    });

    it('should not deleted user with passed id', async () => {
        await request(appMock).delete('/users/8696e982-e93d-4c40-abda-991ed5917616').expect(404);
    });
});
