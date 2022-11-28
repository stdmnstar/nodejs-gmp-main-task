/* eslint-disable callback-return */
import { Response, Request, NextFunction } from 'express';
import { LoginService } from '../services/login';
import { UserRepository } from '../repository/user';
import HttpException from '../common/http-exception';
import { getErrorMessage, getErrorStatusCode } from '../utils/utils';

const userRepository = new UserRepository();
const userService = new LoginService(userRepository);

const authorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { login, password } = req.body;
        const token = await userService.authorization(login as string, password as string);
        res.json({ token });
    } catch (error) {
        next(new HttpException(getErrorMessage(error), getErrorStatusCode(error), 'login'));
    }
};

export default { authorization };
