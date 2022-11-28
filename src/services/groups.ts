/* eslint-disable no-unused-vars */
import HttpException from '../common/http-exception';
import { trackTime } from '../decorators/track-time';
import { IGroup } from '../model/group';
import { IUsersGroup } from '../model/user-group';
import { IGroupRepository } from '../repository/group';

interface IGroupService {
    getAll(): Promise<IGroup[]>,
    getById(id: string): Promise<IGroup | null>,
    create(group: IGroup): Promise<IGroup>,
    update(id: string, payload: IGroup): Promise<IGroup | undefined>,
    remove(id: string): Promise<boolean>,
    addUsers(groupId: string, userIds: string[]): Promise<IUsersGroup[] |undefined>,
}

export class GroupService implements IGroupService {
    constructor(private groupRepository: IGroupRepository) {
        this.groupRepository = groupRepository;
    }

    @trackTime('GroupService')
    async getAll() {
        return this.groupRepository.getAll();
    }

    @trackTime('GroupService')
    async getById(id: string) {
        const group = await this.groupRepository.getById(id);
        if (!group) throw new HttpException('Group not found', 404);
        return group;
    }

    @trackTime('GroupService')
    async create(data: IGroup) {
        return this.groupRepository.create(data);
    }

    @trackTime('GroupService')
    async update(id: string, data: IGroup) {
        const group = await this.groupRepository.updateOne(id, data);
        if (!group) throw new HttpException('Group not found', 404);
        return group;
    }

    @trackTime('GroupService')
    async remove(id: string) {
        const isDelete = await this.groupRepository.removeOne(id);
        if (!isDelete) throw new HttpException('Group not found', 404);
        return isDelete;
    }

    @trackTime('GroupService')
    async addUsers(groupId: string, userIds: string[]) {
        return this.groupRepository.addUsers(groupId, userIds);
    }
}
