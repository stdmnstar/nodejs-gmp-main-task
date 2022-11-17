/* eslint-disable no-unused-vars */
import { IGroup } from '../model/group';
import { IUsersGroup } from '../model/user-group';
import { IGroupRepository } from '../repository/group';

interface IGroupService {
    getAll(): Promise<IGroup[]>,
    getById(id: string): Promise<IGroup | null>,
    create(group: IGroup): Promise<IGroup>,
    update(id: string, payload: IGroup): Promise<IGroup | undefined>,
    remove(id: string): Promise<boolean>,
    addUsers(groupId: string, userIds: string[]): Promise<IUsersGroup[]>,
}

export class GroupService implements IGroupService {
    constructor(private groupRepository: IGroupRepository) {
        this.groupRepository = groupRepository;
    }

    getAll = () => this.groupRepository.getAll();

    getById = (id: string) => this.groupRepository.getById(id);

    create = (data: IGroup) => this.groupRepository.create(data);

    update = (id: string, data: IGroup) => this.groupRepository.updateOne(id, data);

    remove = (id: string) => this.groupRepository.removeOne(id);

    addUsers = (groupId: string, userIds: string[]) => this.groupRepository.addUsers(groupId, userIds);
}
