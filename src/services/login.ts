/* eslint-disable no-unused-vars */
import jsonwebtoken from 'jsonwebtoken';
import HttpException from '../common/http-exception';
import { trackTime } from '../decorators/track-time';
import { IUserRepository } from '../repository/user';
import config from '../config';

interface ILoginService {
    authorization(login: string, password: string): Promise<string>,
}

export class LoginService implements ILoginService {
    constructor(private userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    @trackTime('LoginService')
    async authorization(login: string, password: string) {
        const user = await this.userRepository.getByLogin(login);

        if (!user || password !== user.password) {
            throw new HttpException('Bad login/password combination', 401);
        }
        return jsonwebtoken.sign({ id: user.id }, config.JWT_SECRET as string, { expiresIn: config.EXPIRE_TIME });
    }
}
