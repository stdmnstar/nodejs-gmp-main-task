/* eslint-disable no-unused-vars */
import { IUsersGroup } from '../model/user-group';
import { IUsersGroupRepository } from '../repository/users-group';

interface IUsersGroupService {
    create(groupId: string, userIds: string[]): Promise<IUsersGroup[]>,
}

export class UsersGroupService implements IUsersGroupService {
    constructor(private groupRepository: IUsersGroupRepository) {
        this.groupRepository = groupRepository;
    }

    create = (groupId: string, userIds: string[]) => this.groupRepository.create(groupId, userIds);
}
