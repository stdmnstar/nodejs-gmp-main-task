/* eslint-disable no-unused-vars */
import { Group, IGroup, GroupModel } from '../model/group';

export interface IGroupRepository {
    getAll(): Promise<GroupModel[]>,
    getById(id: string): Promise<GroupModel | null>,
    create(group: IGroup): Promise<GroupModel>,
    updateOne(id: string, payload: IGroup): Promise<GroupModel | undefined>,
    removeOne(id: string): Promise<boolean>,
}
export class GroupRepository implements IGroupRepository {
    getAll = () => Group.findAll();

    getById = (id: string) => Group.findOne({ where: { id } });

    create = (group: IGroup) => Group.create({ ...group }, { returning: true });

    updateOne = async (id: string, payload: IGroup) => {
        const [, [updatedGroup]] = await Group.update(payload, {
            where: { id },
            returning: true
        });
        return updatedGroup;
    };

    removeOne = async (id: string) => {
        const group = await Group.destroy({ where: { id } });
        return Boolean(group);
    };
}
