import express from 'express';
import request, { Response } from 'supertest';
import * as http from 'http';
import { groupsRouter } from '../routes/groups';
import { User } from '../model/user';
import { Group } from '../model/group';
import { UserGroup } from '../model/user-group';
import { db } from '../database/db';

const port = 5000;
const appMock = express();

let server: http.Server;

appMock.use(express.json());
appMock.use('/groups', groupsRouter);

const group1Mock = {
    name: 'Group1',
    permissions: ['READ', 'WRITE']
};

const group2Mock = {
    name: 'Group2',
    permissions: ['READ', 'WRITE', 'DELETE']
};

let groupIdMock: number;

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

describe('Create group', () => {
    it('should create new group', async () => {
        await request(appMock)
            .post('/groups')
            .send(group1Mock)
            .expect(201)
            .expect((res: Response) => {
                expect(res.body.id).toBeTruthy();
                groupIdMock = res.body.id;
            });
    });
});

describe('Get group by id', () => {
    it('should find group with passed id', async () => {
        await request(appMock)
            .get(`/groups/${groupIdMock}`)
            .expect(200)
            .expect((res: Response) => {
                expect(res.body.name).toBe(group1Mock.name);
                expect(res.body.permissions).toStrictEqual(group1Mock.permissions);
            });
    });

    it('should not find group with passed id', async () => {
        await request(appMock)
            .get('/groups/8696e982-e93d-4c40-abda-991ed5917616')
            .expect(404);
    });
});

describe('Update group by id', () => {
    it('should update group with passed id', async () => {
        await request(appMock)
            .put(`/groups/${groupIdMock}`)
            .send(group2Mock)
            .expect(200)
            .expect((res: Response) => {
                expect(res.body.name).toBe(group2Mock.name);
                expect(res.body.permissions).toStrictEqual(group2Mock.permissions);
            });
    });

    it('should not update group with passed id', async () => {
        await request(appMock)
            .put('/groups/8696e982-e93d-4c40-abda-991ed5917616')
            .send(group2Mock)
            .expect(404);
    });
});

describe('Get all groups', () => {
    it('should get all groups', async () => {
        await request(appMock)
            .get('/groups')
            .expect(200)
            .expect((res: Response) => {
                expect(res.body.length).toBeGreaterThan(0);
            });
    });
});

describe('Delete group', () => {
    it('should deleted group with passed id', async () => {
        await request(appMock)
            .delete(`/groups/${groupIdMock}`)
            .expect(204);
    });

    it('should not deleted group with passed id', async () => {
        await request(appMock)
            .delete(`/groups/${groupIdMock}`)
            .expect(404);
    });
});
