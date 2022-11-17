/* eslint-disable no-unused-vars */
import HttpException from '../common/http-exception';
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

    getAll = () => this.groupRepository.getAll();

    getById = async (id: string) => {
        const group = await this.groupRepository.getById(id);
        if (!group) throw new HttpException(404, 'Group not found');
        return group;
    };

    create = (data: IGroup) => this.groupRepository.create(data);

    update = async (id: string, data: IGroup) => {
        const group = await this.groupRepository.updateOne(id, data);
        if (!group) throw new HttpException(404, 'Group not found');
        return group;
    };

    remove = async (id: string) => {
        const isDelete = await this.groupRepository.removeOne(id);
        if (!isDelete) throw new HttpException(404, 'Group not found');
        return isDelete;
    };


    addUsers = (groupId: string, userIds: string[]) => this.groupRepository.addUsers(groupId, userIds);
}
